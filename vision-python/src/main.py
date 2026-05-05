import cv2
import numpy as np
import mss
import requests
import os
from datetime import datetime
import traceback
from pyzbar.pyzbar import decode  # 🔥 NOVO

API_URL = "http://localhost:3000/api/leituras"

EMPRESA_ID = os.getenv("EMPRESA_ID")

if not EMPRESA_ID:
    print("ERRO: EMPRESA_ID não foi informado pelo backend.")
    exit()

print("Empresa selecionada:", EMPRESA_ID)

ultimo_qr = None

with mss.mss() as sct:
    monitor = sct.monitors[1]

    print("Captura iniciada. Pressione ESC para sair.")

    try:
        while True:
            screenshot = sct.grab(monitor)
            frame = np.array(screenshot)

            if frame is None or frame.size == 0:
                print("Frame inválido")
                continue

            frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)

            altura, largura, _ = frame.shape

            # 🔍 recorte central
            x1 = int(largura * 0.25)
            y1 = int(altura * 0.20)
            x2 = int(largura * 0.75)
            y2 = int(altura * 0.80)

            recorte = frame[y1:y2, x1:x2]

            if recorte is None or recorte.size == 0:
                print("Recorte inválido")
                continue

            # 🔥 zoom controlado
            recorte_ampliado = cv2.resize(
                recorte,
                None,
                fx=1.5,
                fy=1.5,
                interpolation=cv2.INTER_LINEAR
            )

            # 🔥 processamento
            gray = cv2.cvtColor(recorte_ampliado, cv2.COLOR_BGR2GRAY)
            gray = cv2.medianBlur(gray, 3)

            clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
            gray = clahe.apply(gray)

            kernel = np.array([[0, -1, 0],
                               [-1, 5, -1],
                               [0, -1, 0]])
            sharp = cv2.filter2D(gray, -1, kernel)

            # ===============================
            # 🔥 NOVA LEITURA COM PYZBAR
            # ===============================
            data = ""
            thresh = sharp

            qr_codes = decode(sharp)

            if not qr_codes:
                qr_codes = decode(gray)

            if not qr_codes:
                _, thresh_bin = cv2.threshold(
                    sharp,
                    0,
                    255,
                    cv2.THRESH_BINARY + cv2.THRESH_OTSU
                )
                qr_codes = decode(thresh_bin)
                thresh = thresh_bin

            if qr_codes:
                qr = qr_codes[0]
                data = qr.data.decode("utf-8")

                # desenha bounding box
                (x, y, w, h) = qr.rect
                cv2.rectangle(recorte_ampliado, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # desenha área analisada
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            if data:
                cv2.putText(
                    frame,
                    f"QR: {data[:60]}",
                    (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8,
                    (0, 255, 0),
                    2
                )

                if data != ultimo_qr:
                    ultimo_qr = data
                    print("QR Code lido:", data)

                    payload = {
                        "empresa_id": int(EMPRESA_ID),
                        "codigo_qr": data,
                        "local_lido": "DRONE",
                        "status": "lido",
                        "timestamp": datetime.now().isoformat()
                    }

                    try:
                        response = requests.post(API_URL, json=payload, timeout=3)
                        print("Enviado para API:", response.status_code)
                    except Exception as e:
                        print("Erro ao enviar para API:", e)

            # 🔥 exibição segura
            try:
                cv2.imshow("Tela Completa", frame)
                cv2.imshow("Recorte Ampliado", recorte_ampliado)
                cv2.imshow("Processado", thresh)
            except:
                pass

            if cv2.waitKey(1) & 0xFF == 27:
                break

    except Exception as e:
        print("ERRO:", e)
        traceback.print_exc()

cv2.destroyAllWindows()