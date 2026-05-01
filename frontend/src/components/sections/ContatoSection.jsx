import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPhone, FiMail, FiChevronRight, FiSend } from 'react-icons/fi'
import { useContactStore } from '@/hooks/useStore'
import { CONTATO } from '@/data'
import styles from './ContatoSection.module.css'

const TIPOS = [
  { id: 'duvida',     label: 'Dúvida' },
  { id: 'feedback',   label: 'Feedback' },
  { id: 'reclamacao', label: 'Reclamação' },
  { id: 'sugestao',   label: 'Sugestão' },
  { id: 'pedido',     label: 'Pedido' },
  { id: 'outro',      label: 'Outro' },
]

const FAQS = [
  'Como rastrear meu pedido?',
  'Qual o prazo de entrega?',
  'Como funciona a troca?',
  'Medicamento controlado online?',
  'Como usar o programa fidelidade?',
]

export default function ContatoSection() {
  const [tipo, setTipo] = useState('duvida')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { loading, sent, sendMessage, reset: resetStore } = useContactStore()

  const onSubmit = async (data) => {
    await sendMessage({ ...data, tipo })
    reset()
  }

  return (
    <section className={styles.section}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <p className={styles.tag}>Atendimento ao Cliente</p>
          <h2 className={styles.title}>Fale com a gente!</h2>
          <p className={styles.sub}>Dúvidas, sugestões ou feedback — estamos aqui para ajudar.</p>
        </div>
        <div className={styles.canais}>
          <a href={CONTATO.whatsappLink} target="_blank" rel="noopener noreferrer" className={`${styles.canal} ${styles.wpp}`}>
            <svg viewBox="0 0 24 24" className={styles.wppIcon}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <div><p className={styles.cLabel}>WhatsApp</p><p className={styles.cSub}>Resposta rápida</p></div>
          </a>
          <a href={`tel:${CONTATO.telefone}`} className={styles.canal}>
            <FiPhone size={18} color="white" />
            <div><p className={styles.cLabel}>Telefone</p><p className={styles.cSub}>{CONTATO.telefone}</p></div>
          </a>
          <a href={`mailto:${CONTATO.email}`} className={styles.canal}>
            <FiMail size={18} color="white" />
            <div><p className={styles.cLabel}>E-mail</p><p className={styles.cSub}>contato@bemestarf.</p></div>
          </a>
        </div>
      </div>

      {/* BODY */}
      <div className={styles.body}>
        {/* FORM */}
        <div className={styles.formSide}>
          {sent ? (
            <div className={styles.success}>
              <span>✅</span>
              <h3>Mensagem enviada!</h3>
              <p>Retornaremos em breve. Obrigado pelo contato.</p>
              <button onClick={resetStore}>Enviar outra mensagem</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* Tipo */}
              <div className={styles.formGroup}>
                <label>Tipo de contato</label>
                <div className={styles.tipos}>
                  {TIPOS.map(t => (
                    <button
                      key={t.id} type="button"
                      className={`${styles.tipoBtn} ${tipo === t.id ? styles.tipoActive : ''}`}
                      onClick={() => setTipo(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Nome completo</label>
                  <input placeholder="Seu nome" {...register('nome', { required: true })} className={errors.nome ? styles.inputError : ''} />
                </div>
                <div className={styles.formGroup}>
                  <label>WhatsApp</label>
                  <input placeholder="(84) 9 9999-0000" {...register('whatsapp')} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>E-mail</label>
                <input type="email" placeholder="seu@email.com" {...register('email', { required: true })} className={errors.email ? styles.inputError : ''} />
              </div>

              <div className={styles.formGroup}>
                <label>Mensagem</label>
                <textarea placeholder="Descreva sua dúvida, sugestão ou feedback..." {...register('mensagem', { required: true })} rows={4} className={errors.mensagem ? styles.inputError : ''} />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : <FiSend size={14} />}
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          )}
        </div>

        {/* INFO */}
        <div className={styles.infoSide}>
          <div className={styles.infoCard}>
            <div className={styles.infoIconWpp}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div><p className={styles.it}>WhatsApp</p><p className={styles.is}>Tire dúvidas e faça pedidos rapidamente.</p><p className={styles.iv}>{CONTATO.whatsapp}</p></div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><FiPhone size={18} color="white" /></div>
            <div><p className={styles.it}>Central de Atendimento</p><p className={styles.is}>Seg–Sáb das 7h às 22h.</p><p className={styles.iv}>{CONTATO.telefone}</p></div>
          </div>
          <div className={styles.infoCard}>
            <div className={`${styles.infoIcon} ${styles.red}`}><FiMail size={18} color="white" /></div>
            <div><p className={styles.it}>E-mail</p><p className={styles.is}>Respondemos em até 24h úteis.</p><p className={styles.iv}>{CONTATO.email}</p></div>
          </div>

          <div className={styles.faq}>
            <p className={styles.faqTitle}>Perguntas frequentes</p>
            {FAQS.map(q => (
              <div key={q} className={styles.faqItem}>
                <span>{q}</span>
                <FiChevronRight size={14} color="#003087" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
