from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from typing import Optional
import requests
import logging
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s", handlers=[logging.StreamHandler()])

def log_message(level, message):
    if level == "info":
        logging.info(message)
    elif level == "error":
        logging.error(message)
    print(message)

def verify_recaptcha(token: str) -> bool:
    SECRET_KEY  = os.getenv("RECAPTCHA_SECRET_KEY")
    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={"secret": SECRET_KEY, "response": token}
    )
    result = response.json()
    return result.get("success", False)

app = FastAPI()
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
INSTAGRAM_URL = os.getenv("INSTAGRAM_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class FormData(BaseModel):
    name: str
    email: str
    phoneNum: str
    date: str
    time: str
    peopleNum: str
    message: str
    recaptchaToken: Optional[str] = None

def mask_email(email: str) -> str:
    try:
        local, domain = email.split("@")
        if len(local) <= 2:
            return "***@" + domain
        return local[:2] + "***@" + domain
    except Exception:
        return "***@***"
    
def mask_name(name: str) -> str:
    if not name:
        return "**"
    return name[0] + "*"

def mask_phone(phone: str) -> str:
    return phone[:3] + "-****-****" if len(phone) >= 11 else "非表示"

@app.post("/api/send")
async def read_data(form: FormData):
    if not verify_recaptcha(form.recaptchaToken):
        log_message("error", "reCAPTCHA認証失敗")
        return {"error": "reCAPTCHA validation failed"}
    
    masked_email = mask_email(form.email)
    masked_name = mask_name(form.name)
    masked_phone = mask_phone(form.phoneNum)
    log_message("info", f"予約フォームからの受信を確認:{masked_name}, ({masked_email}), {masked_phone}")

    sender = EMAIL_ADDRESS
    app_password = EMAIL_PASSWORD

    owner_subject = "「さて羊に戻るとしよう」ホームページからのお問い合わせ"
    owner_address = EMAIL_ADDRESS
    owner_msg_body = f"""【ご予約・お問い合わせ】
    以下のご予約・お問い合わせをホームページから受け付けました。

    ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    ■お名前:{form.name}様
    ■メール:{form.email}
    ■電話番号:{form.phoneNum}
    ■来店希望日:{form.date}
    ■時間:{form.time}
    ■人数:{form.peopleNum}
    ■ご要望:{form.message}
    ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    """
    owner_msg = MIMEText(owner_msg_body)
    owner_msg["Subject"] = owner_subject
    owner_msg["From"] = sender
    owner_msg["To"] = owner_address

    customer_address = form.email
    customer_subject = "「さて羊に戻るとしよう」ホームページからのお問い合わせ 確認メール"
    customer_msg_body = f"""【ご予約・お問い合わせ 確認メール】
    以下の内容でお問い合わせを受け付けました。
    飲食店オーナーからの返信をお待ちください。
    ※オーナーからの返信をもって、ご予約は確定となります。

    ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    ■お名前:{form.name}様
    ■メール:{form.email}
    ■電話番号:{form.phoneNum}
    ■来店希望日:{form.date}
    ■時間:{form.time}
    ■人数:{form.peopleNum}
    ■ご要望:{form.message}
    ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

    ※本メールは送信専用です。このメールには返信しないでください。
    ※キャンセルやご変更は前日までにご連絡お願いいたします。
    ご不明点がある場合は、ホームページ内のお問い合わせよりご連絡ください。

    ―――――――――――――――――――――――――――
    【店舗情報】
    さて羊に戻るとしよう
    富山県高岡市駅南5-4-7 WINE LAB内にて間借り営業中
    営業時間:11:00～14:30(L.O.13:45)
    定休日:火曜日と木曜日
    Instagram:{INSTAGRAM_URL}
    ―――――――――――――――――――――――――――
    """

    customer_msg = MIMEText(customer_msg_body)
    customer_msg["Subject"] = customer_subject
    customer_msg["From"] = sender
    customer_msg["To"] = customer_address

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, app_password)
            server.send_message(owner_msg)
            server.send_message(customer_msg)
            log_message("info", f"メール送信成功: {masked_email}")
        return {"message": "メール送信成功"}
    except Exception as e:
        log_message("error", f"メール送信失敗: {str(e)}")
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)