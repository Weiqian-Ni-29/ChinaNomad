import './Footer.css';
import inslogo from '../assets/imgs/Instagram_logo_2016.svg.png'
import xiaohongshulogo from '../assets/imgs/XiaohongshuLOGO.png'
import Tiktoklogo from '../assets/imgs/tiktok.jpg'
function Footer() {
    return (
        <footer>
            <div className="social-media-container">
                <h3>Follow us on social media</h3>
                <div className="social-icons">
                    <a
                        href="https://www.instagram.com/china__nomad1124/"
                        target="_blank"
                        rel="noreferrer noopener"
                        title="Instagram"
                    >
                        <img
                        className="social-logo-image"
                        src={inslogo}
                        alt="Instagram"
                        />
                    </a>
                    <a
                        href="https://www.xiaohongshu.com/user/profile/6747d76100000000010027ae?xsec_token=ABP0RzheeQMVx43OXJrRM5XIzprAymlXLNN2NicsVwpLs%3D&xsec_source=pc_search"
                        target="_blank"
                        rel="noreferrer noopener"
                        title="XiaoHongShu"
                    >
                        <img
                        className="social-logo-image"
                        src={xiaohongshulogo}
                        alt="XiaoHongShu"
                        />
                    </a>
                    <a
                        href="https://www.tiktok.com/explore"
                        target="_blank"
                        rel="noreferrer noopener"
                        title="Tiktok"
                    >
                        <img
                        className="social-logo-image"
                        src={Tiktoklogo}
                        alt="Tiktok"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;