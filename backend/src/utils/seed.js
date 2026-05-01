require('dotenv').config()
const mongoose = require('mongoose')
const Filial  = require('../models/Filial')
const Produto = require('../models/Produto')
const User    = require('../models/User')
const Cupom   = require('../models/Cupom')

const FILIAIS = [
  { numero:1,  nome:'Nova Cidade',       bairro:'Nova Cidade',       cidade:'Natal', estado:'RN', whatsapp:'(84) 98602-4913', whatsappLink:'https://wa.me/5584986024913', instagram:'@befnatal', instagramLink:'https://instagram.com/befnatal', horario:{ semana:'7h às 22h', sabado:'7h às 22h', domingo:'8h às 20h' }, ativa:true, aberta:true },
  { numero:2,  nome:'Nazaré',            bairro:'Nazaré',            cidade:'Natal', estado:'RN', whatsapp:'(84) 98604-8535', whatsappLink:'https://wa.me/5584986048535', instagram:'@befnatal', instagramLink:'https://instagram.com/befnatal', horario:{ semana:'7h às 22h', sabado:'7h às 22h', domingo:'8h às 20h' }, ativa:true, aberta:true },
  { numero:4,  nome:'Pajuçara',          bairro:'Pajuçara',          cidade:'Natal', estado:'RN', whatsapp:'(84) 98895-0005', whatsappLink:'https://wa.me/5584988950005', instagram:'@befnatal', instagramLink:'https://instagram.com/befnatal', horario:{ semana:'7h às 22h', sabado:'7h às 22h', domingo:'8h às 20h' }, ativa:true, aberta:true },
  { numero:5,  nome:'Emaús / Parnamirim',bairro:'Emaús',             cidade:'Parnamirim', estado:'RN', whatsapp:'(84) 98863-0897', whatsappLink:'https://wa.me/5584988630897', instagram:'@befnatal', instagramLink:'https://instagram.com/befnatal', horario:{ semana:'7h às 22h', sabado:'7h às 22h', domingo:'8h às 20h' }, ativa:true, aberta:true },
  { numero:6,  nome:'Taipu',             bairro:'Taipu',             cidade:'Taipu',  estado:'RN', whatsapp:'(84) 99158-5727', whatsappLink:'https://wa.me/5584991585727', instagram:'@beftaipu', instagramLink:'https://instagram.com/beftaipu', horario:{ semana:'7h às 21h', sabado:'7h às 21h', domingo:'8h às 18h' }, ativa:true, aberta:true },
  { numero:7,  nome:'Rio do Fogo',       bairro:'Rio do Fogo',       cidade:'Rio do Fogo', estado:'RN', whatsapp:'(84) 99134-1662', whatsappLink:'https://wa.me/5584991341662', instagram:'@befriodofogo', instagramLink:'https://instagram.com/befriodofogo', horario:{ semana:'7h às 21h', sabado:'7h às 21h', domingo:'8h às 18h' }, ativa:true, aberta:true },
  { numero:8,  nome:'Umari',             bairro:'Umari',             cidade:'Umari', estado:'RN', whatsapp:'(84) 99879-0050', whatsappLink:'https://wa.me/5584998790050', instagram:'@bef.umari', instagramLink:'https://instagram.com/bef.umari', horario:{ semana:'8h às 20h', sabado:'8h às 20h', domingo:'Fechado' }, ativa:true, aberta:true },
  { numero:9,  nome:'Primeira Lagoa',    bairro:'Primeira Lagoa',    cidade:'Canguaretama', estado:'RN', whatsapp:'(84) 99816-0185', whatsappLink:'https://wa.me/5584998160185', instagram:'@bef.umari', instagramLink:'https://instagram.com/bef.umari', horario:{ semana:'8h às 20h', sabado:'8h às 20h', domingo:'Fechado' }, ativa:true, aberta:true },
  { numero:10, nome:'Ponta do Mato',     bairro:'Ponta do Mato',     cidade:'Canguaretama', estado:'RN', whatsapp:'(84) 99894-0242', whatsappLink:'https://wa.me/5584998940242', instagram:'@bef.umari', instagramLink:'https://instagram.com/bef.umari', horario:{ semana:'8h às 20h', sabado:'8h às 20h', domingo:'Fechado' }, ativa:true, aberta:false },
]

const PRODUTOS = [
  { nome:'Dipirona Sódica 500mg 10 comprimidos', preco:7.10, precoOriginal:8.90, desconto:20, estoque:250, categoria:'medicamentos', subcategoria:'Sem Receita', emoji:'💊', destaque:true, tags:['dor','febre','dipirona'] },
  { nome:'Sabonete Dove Original 90g',            preco:4.99, estoque:180, categoria:'higiene', emoji:'🧴', destaque:true, tags:['sabonete','higiene'] },
  { nome:'Protetor Solar Episol FPS 50 120ml',    preco:35.70, precoOriginal:42.00, desconto:15, estoque:90, categoria:'dermocosmeticos', emoji:'☀️', destaque:true, tags:['protetor solar','fps 50','dermo'] },
  { nome:'Fralda Pampers Supersec XG 20 unidades',preco:39.90, estoque:60, categoria:'infantil', emoji:'👶', destaque:true, tags:['fralda','pampers','bebê'] },
  { nome:'Vitamina C 1000mg 60 cápsulas',         preco:22.40, precoOriginal:29.90, desconto:25, estoque:130, categoria:'saude', emoji:'💛', destaque:true, tags:['vitamina c','imunidade','suplemento'] },
  { nome:'Amoxicilina 500mg 21 cápsulas',         preco:14.50, estoque:200, categoria:'medicamentos', emoji:'💊', necessitaReceita:true, tags:['antibiótico','amoxicilina'] },
  { nome:'Shampoo Clear Men 400ml',               preco:18.90, estoque:75, categoria:'higiene', emoji:'🧴', tags:['shampoo','anticaspa'] },
  { nome:'Ômega 3 1000mg 60 cápsulas',            preco:34.90, estoque:88, categoria:'saude', emoji:'🐟', destaque:false, tags:['ômega 3','coração','suplemento'] },
  { nome:'Lenço Umedecido Huggies 96 unidades',   preco:22.90, estoque:140, categoria:'infantil', emoji:'🍼', tags:['lenço','bebê','huggies'] },
  { nome:'Hidratante Nivea Body Milk 400ml',      preco:27.90, estoque:55, categoria:'beleza', emoji:'🧴', tags:['hidratante','nivea','pele'] },
]

const CUPONS = [
  { codigo:'BEMVINDO10', tipo:'percentual', valor:10, pedidoMinimo:50,  usoMaximo:500,  validade: new Date('2025-12-31') },
  { codigo:'FRETEGRATIS', tipo:'frete_gratis', valor:0, pedidoMinimo:30, usoMaximo:1000, validade: new Date('2025-12-31') },
  { codigo:'BEBE20',     tipo:'percentual', valor:20, pedidoMinimo:80,  usoMaximo:200,  validade: new Date('2025-12-31'), categorias:['infantil'] },
]

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('🔗 Conectado ao MongoDB')

  // Limpar coleções
  await Promise.all([Filial.deleteMany(), Produto.deleteMany(), Cupom.deleteMany()])
  console.log('🗑️  Dados antigos removidos')

  // Inserir
  await Filial.insertMany(FILIAIS)
  console.log(`✅ ${FILIAIS.length} filiais inseridas`)

  await Produto.insertMany(PRODUTOS)
  console.log(`✅ ${PRODUTOS.length} produtos inseridos`)

  await Cupom.insertMany(CUPONS)
  console.log(`✅ ${CUPONS.length} cupons inseridos`)

  // Admin padrão
  const adminExiste = await User.findOne({ email: 'admin@bemestarf.com.br' })
  if (!adminExiste) {
    await User.create({ nome:'Admin BemEstar', email:'admin@bemestarf.com.br', senha:'Admin@2025!', role:'admin' })
    console.log('✅ Admin criado: admin@bemestarf.com.br / Admin@2025!')
  }

  console.log('\n🚀 Seed concluído!\n')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
