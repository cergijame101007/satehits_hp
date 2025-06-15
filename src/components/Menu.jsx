import './Menu.css'

function Menu() {
    return (
        <section id="menu" className="menuItem">
            <h2>メニュー</h2>
            <h3>セットメニュー</h3>
            <p>本日のごはん ー ￥2,200</p>
            <ul>
                <li>旬菜４～５品</li>
                <li>お米</li>
                <li>みそ汁</li>
                <li>豆花と和紅茶</li>
            </ul>
            <p>おむずび、みそ汁と和紅茶 ー ￥1,000</p>
            <p>和紅茶とクラフティのセット  ー  ￥1,000</p>
            <h3>フードメニュー</h3>
            <p>本日のクラフティ ー ￥500</p>
            <p>おむすび ー ￥300</p>
            <p>みそ汁 ー ￥300</p>
            <h3>ドリンク</h3>
            <p>和紅茶 (HOT/ICE) ー ￥500/￥550</p>
        </section>
    );
};

export default Menu