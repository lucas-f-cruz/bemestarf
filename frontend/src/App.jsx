import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import Home from '@/pages/Home'

// Páginas placeholder — substituir com implementação real
const Placeholder = ({ nome }) => (
  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#003087' }}>
    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{nome}</h2>
    <p style={{ color: '#666' }}>Página em desenvolvimento.</p>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:id" element={<Placeholder nome="Categoria" />} />
        <Route path="/busca" element={<Placeholder nome="Busca" />} />
        <Route path="/carrinho" element={<Placeholder nome="Carrinho" />} />
        <Route path="/conta" element={<Placeholder nome="Minha Conta" />} />
        <Route path="/ofertas" element={<Placeholder nome="Ofertas" />} />
        <Route path="/blog" element={<Placeholder nome="Blog" />} />
        <Route path="/servicos" element={<Placeholder nome="Serviços" />} />
        <Route path="/filiais" element={<Placeholder nome="Nossas Filiais" />} />
        <Route path="/contato" element={<Placeholder nome="Contato" />} />
        <Route path="*" element={<Placeholder nome="Página não encontrada" />} />
      </Routes>

      <Footer />
      <WhatsAppFloat />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'Nunito, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#003087', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  )
}
