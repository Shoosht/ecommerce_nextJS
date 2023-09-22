import styles from './footer.module.css';
import Image from 'next/image';
import github_icon from '../../public/github.svg';
import facebook_icon from '../../public/facebook.svg';
import instagram_icon from '../../public/instagram.svg';
import youtube_icon from '../../public/youtube.svg';

export default function Footer(){
    return(<div className={styles.footer}>
        <div className={styles.footer_wrapper}>

            <div className={styles.footer_content_left}>
                
            </div>

            <div className={styles.footer_content_middle}>

                <div className={styles.left}>
                    <div className={styles.footer_option}>
                        Help Center
                    </div>
                    <div className={styles.footer_option}>
                        Warranty
                    </div>
                    <div className={styles.footer_option}>
                        Product Help
                    </div>
                    <div className={styles.footer_option}>
                        Order Status
                    </div>
                </div>

                <div className={styles.middle}>
                    <div className={styles.footer_option}>
                        Bulk Orders
                    </div>
                    <div className={styles.footer_option}>
                        Recycling
                    </div>
                    <div className={styles.footer_option}>
                        Help
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.footer_option}>
                        About Us
                    </div>
                    <div className={styles.footer_option}>
                        Careers
                    </div>
                    <div className={styles.footer_option}>
                        Contact Us
                    </div>

                </div>

            </div>

            <div className={styles.footer_content_right}>
                <div>
                    <div className={styles.right_up}>
                        <div className={styles.follow_us}>
                            Follow Us
                        </div>
                    </div>
                    
                    <div className={styles.right_down}>
                        <Image className={styles.footer_icon} src={facebook_icon} alt="Facebook Icon" ></Image>
                        <Image className={styles.footer_icon} src={instagram_icon} alt="Instagram Icon" ></Image>
                        <Image className={styles.footer_icon} src={youtube_icon} alt="YouTube Icon" ></Image>
                        <a href="https://github.com/Shoosht" target="_blank" rel="noopener noreferrer">
                                <Image className={styles.footer_icon} src={github_icon} alt="GitHub Icon" />
                        </a>
                    </div>

                </div>

            </div>

        </div>

    </div>);
}