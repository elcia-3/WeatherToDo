import Sidebar from '../components/sidebar'
import styles from '../styles/sidebartest.module.css'
import Layout from '../components/layout';

const New = () => {
    return (
        <>
          <Layout>
          </Layout>            
            <div className={styles.WholePage}>
                <div className={styles.SidebarBox}>
                    <Sidebar>
                        <a>Nav Item</a>
                        <a>Nav Item</a>
                        <a>Nav Item</a>
                        <a>Nav Item</a>
                        <a>Nav Item</a>
                    </Sidebar>
                </div>
                <div className="MainBox">
                    <p>test</p>
                </div>
            </div>
       </>
    )
};

export default New;