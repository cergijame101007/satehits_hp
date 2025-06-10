import { useState } from "react";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import './Form.css';
import { isValidPhoneNumber } from 'libphonenumber-js'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNum: '',
        date: '',
        time: '',
        peopleNum: '',
        message: '',
    })

    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === "phoneNum") {
            const cleaned = e.target.value.replace(/[-\s]/g, "");
            const isValid =
                (cleaned.length === 10 || cleaned.length === 11) &&
                isValidPhoneNumber(`+81${cleaned.slice(1)}`, "JP");

            if (!isValid) {
                setPhoneError("無効な電話番号です。正しい10桁または11桁の番号を入力してください。")
            } else {
                setPhoneError("")
            }
        }
    }

    const handleCaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleaned = formData.phoneNum.replace(/[-\s]/g, "");
        const isValidPhone =
            (cleaned.length === 10 || cleaned.length === 11) &&
            isValidPhoneNumber(`+81${cleaned.slice(1)}`, "JP");

        if (!isValidPhone) {
            setPhoneError("無効な電話番号です。正しい番号を入力してください。");
            return;
        }

        if (!recaptchaToken) {
            alert('reCAPTCHA認証を行ってください');
            return;
        }

        const payload = {
            ...formData, message: formData.message.trim() === '' ? 'なし' : formData.message,
            recaptchaToken
        };

        try {
            await axios.post('https://satehits-back.onrender.com/api/send', payload);
            navigate('/thanks');
        } catch (error) {
            console.error('送信エラー:', error);
            alert('送信に失敗しました。');
        }
    };

    const isFormValid = (
        phoneError === "" &&
        formData.name && formData.email && formData.phoneNum && formData.date && formData.time && formData.peopleNum &&
        recaptchaToken
    )

    return (
        <section id="contact" className="form-wrapper">
            <h2>ご予約・お問い合わせ</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" class="required">お名前</label>
                <input type="text" id="name" name="name" placeholder="例: 山田 太郎" onChange={handleChange} value={formData.name} required />
                <label htmlFor="email" class="required">メールアドレス</label>
                <input type="email" id="email" name="email" placeholder="例: yamada@example.com" onChange={handleChange} value={formData.email} required />
                <label htmlFor="phone" class="required">電話番号</label>
                <input type="tel" id="phone" name="phoneNum" placeholder="例: 09012345678" onChange={handleChange} value={formData.phoneNum} required />
                {phoneError && <p className="error">{phoneError}</p>}
                <label htmlFor="date" class="required">ご来店希望日</label>
                <input type="date" id="date" name="date" onChange={handleChange} value={formData.date} required />
                <label htmlFor="time" class="required">ご来店希望時間</label>
                <input type="time" id="time" name="time" onChange={handleChange} value={formData.time} required />

                <label htmlFor="number" class="required">人数</label>
                <select id="number" name="peopleNum" onChange={handleChange} value={formData.peopleNum} required>
                    <option value="">選択してください</option>
                    <option value="1">1名</option>
                    <option value="2">2名</option>
                    <option value="3">3名</option>
                    <option value="4">4名以上</option>
                </select>
                <label htmlFor="message">その他ご要望</label>
                <textarea id="message" name="message" rows="4" placeholder="例：アレルギー対応について、席の希望など" onChange={handleChange} value={formData.message}></textarea>
                <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
                <button type="submit" disabled={!isFormValid}>送信する</button>
            </form>
        </section>
    );
}

export default Form