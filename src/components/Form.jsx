import { useState } from "react";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import './Form.css';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Form = () => {
    const [formData, setFromData] = useState({
        name: '',
        email: '',
        phoneNum: '',
        date: '',
        time: '',
        peopleNum: '',
        message: '',
    })

    const [recaptchaToken, setRecaptchaToken] = useState("");

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            alert("reCAPTCHA認証を行ってください");
            return;
        }

        const payload = { ...formData, recaptchaToken };

        try {
            await axios.post('https://satehits-back.onrender.com/api/send', payload);
            alert('送信されました！');
        } catch (error) {
            console.error('送信エラー:', error);
            alert('送信に失敗しました。');
        }
    };

    return (
        <section id="contact" className="form-wrapper">
            <h2>ご予約・お問い合わせ</h2>
            <form onSubmit={handleSubmit}>
                <label for="name" class="required">お名前</label>
                <input type="text" id="name" name="name" placeholder="例: 山田 太郎" onChange={handleChange} value={formData.name} equired />
                <label for="email" class="required">メールアドレス</label>
                <input type="email" id="email" name="email" placeholder="例: yamada@example.com" onChange={handleChange} value={formData.email} required />
                <label for="phone" class="required">電話番号</label>
                <input type="tel" id="phone" name="phoneNum" placeholder="例: 090-1234-5678" onChange={handleChange} value={formData.phoneNum} required />
                <label for="date" class="required">ご来店希望日</label>
                <input type="date" id="date" name="date" onChange={handleChange} value={formData.data} required />
                <label for="time" class="required">ご来店希望時間</label>
                <input type="time" id="time" name="time" onChange={handleChange} value={formData.time} required />

                <label for="number" class="required">人数</label>
                <select id="number" name="peopleNum" onChange={handleChange} value={formData.peopleNum} required>
                    <option value="">選択してください</option>
                    <option value="1">1名</option>
                    <option value="2">2名</option>
                    <option value="3">3名</option>
                    <option value="4">4名以上</option>
                </select>
                <label for="message">その他ご要望</label>
                <textarea id="message" name="message" rows="4" placeholder="例：アレルギー対応について、席の希望など" onChange={handleChange}></textarea>
                <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
                <button type="submit">送信する</button>
            </form>
        </section>
    );
}

export default Form