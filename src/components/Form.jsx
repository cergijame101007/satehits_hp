import './Form.css';

function Form() {
    return (
        <section id="contact" class="form-wrapper">
            <h2>ご予約・お問い合わせ</h2>
            <form>
                <label for="name" class="required">お名前</label>
                <input type="text" id="name" name="name" placeholder="例: 山田 太郎" required />
                <label for="email" class="required">メールアドレス</label>
                <input type="email" id="email" name="email" placeholder="例: yamada@example.com" required />
                <label for="phone" class="required">電話番号</label>
                <input type="tel" id="phone" name="phone" placeholder="例: 090-1234-5678" required />
                <label for="date" class="required">ご来店希望日</label>
                <input type="date" id="date" name="date" required />
                <label for="time" class="required">ご来店希望時間</label>
                <input type="time" id="time" name="time" required />

                <label for="number" class="required">人数</label>
                <select id="number" name="number" required>
                    <option value="">選択してください</option>
                    <option value="1">1名</option>
                    <option value="2">2名</option>
                    <option value="3">3名</option>
                    <option value="4">4名</option>
                    <option value="5">5名</option>
                    <option value="6">6名以上</option>
                </select>
                <label for="message">その他ご要望</label>
                <textarea id="message" name="message" rows="4" placeholder="例：アレルギー対応について、席の希望など"></textarea>
                <button type="submit">送信する</button>
            </form>
        </section>
    );
}

export default Form