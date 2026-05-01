import { Link } from 'react-router-dom'
import { FiSmartphone } from 'react-icons/fi'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* MARCA */}
        <div className={styles.brand}>
          <img src="/logo.jpg" alt="Bem Estar Farma" className={styles.logo} />
          <p>Sua saúde é nosso compromisso. Medicamentos, beleza e bem-estar com qualidade e preço justo para toda a família.</p>
        </div>

        {/* INSTITUCIONAL */}
        <div className={styles.col}>
          <h4>Institucional</h4>
          <ul>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/filiais">Nossas Filiais</Link></li>
            <li><Link to="/trabalhe-conosco">Trabalhe Conosco</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        {/* COMPRA */}
        <div className={styles.col}>
          <h4>Compra Online</h4>
          <ul>
            <li><Link to="/entrega">Política de Entrega</Link></li>
            <li><Link to="/trocas">Trocas e Devoluções</Link></li>
            <li><Link to="/pagamento">Formas de Pagamento</Link></li>
            <li><Link to="/privacidade">Privacidade</Link></li>
            <li><Link to="/cupons">Cupons de Desconto</Link></li>
          </ul>
        </div>

        {/* SERVIÇOS */}
        <div className={styles.col}>
          <h4>Serviços</h4>
          <ul>
            <li><Link to="/servicos/farmacia-popular">Farmácia Popular</Link></li>
            <li><Link to="/servicos/manipulacao">Manipulação</Link></li>
            <li><Link to="/servicos/fidelidade">Programa Fidelidade</Link></li>
            <li><Link to="/servicos/vacinas">Aplicação de Vacinas</Link></li>
            <li><Link to="/servicos/convenio">Convênio Farmácia</Link></li>
          </ul>
        </div>

        {/* APP */}
        <div className={styles.col}>
          <h4>Nosso Aplicativo</h4>
          <div className={styles.appBox}>
            <FiSmartphone size={28} className={styles.appIcon} />
            <p className={styles.appTitle}>App em breve!</p>
            <p className={styles.appSub}>
              Estamos desenvolvendo nosso app para você ter ainda mais praticidade na palma da mão.
            </p>
            <div className={styles.appBtns}>
              <div className={styles.appBtn}>
                <span>📱</span>
                <div>
                  <span className={styles.btnSub}>Em breve</span>
                  <span className={styles.btnLabel}>App Store</span>
                </div>
              </div>
              <div className={styles.appBtn}>
                <span>📱</span>
                <div>
                  <span className={styles.btnSub}>Em breve</span>
                  <span className={styles.btnLabel}>Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Bem Estar Farma Drogarias — CNPJ 00.000.000/0001-00 | CRF-RN</span>
        <div className={styles.payments}>
          <span className={styles.payLabel}>Aceitamos</span>
          {['Visa', 'Master', 'Pix', 'Elo', 'Hipercard'].map(p => (
            <span key={p} className={styles.payBadge}>{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
