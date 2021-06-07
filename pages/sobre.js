import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Painel COVID-19 - Sobre</title>
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
        </Head>
        <header>
            <nav className="navbar navbar-expand-xl navbar-light bg-light">
                <div className="container">
                    <Link href="/"><a className="navbar-brand">Painel COVID-19</a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navegacao">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navegacao">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/"><a className="nav-link">Brasil</a></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="norte" role="button" data-bs-toggle="dropdown">Norte</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/AC"><a className="dropdown-item" href="#">Acre</a></Link></li>
                                    <li><Link href="/estado/AP"><a className="dropdown-item" href="#">Amapá</a></Link></li>
                                    <li><Link href="/estado/AM"><a className="dropdown-item" href="#">Amazonas</a></Link></li>
                                    <li><Link href="/estado/PA"><a className="dropdown-item" href="#">Pará</a></Link></li>
                                    <li><Link href="/estado/RO"><a className="dropdown-item" href="#">Rondônia</a></Link></li>
                                    <li><Link href="/estado/RR"><a className="dropdown-item" href="#">Roraima</a></Link></li>
                                    <li><Link href="/estado/TO"><a className="dropdown-item" href="#">Tocantins</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="nordeste" role="button" data-bs-toggle="dropdown">Nordeste</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/AL"><a className="dropdown-item" href="#">Alagoas</a></Link></li>
                                    <li><Link href="/estado/BA"><a className="dropdown-item" href="#">Bahia</a></Link></li>
                                    <li><Link href="/estado/CE"><a className="dropdown-item" href="#">Ceará</a></Link></li>
                                    <li><Link href="/estado/MA"><a className="dropdown-item" href="#">Maranhão</a></Link></li>
                                    <li><Link href="/estado/PB"><a className="dropdown-item" href="#">Paraíba</a></Link></li>
                                    <li><Link href="/estado/PE"><a className="dropdown-item" href="#">Pernambuco</a></Link></li>
                                    <li><Link href="/estado/PI"><a className="dropdown-item" href="#">Piauí</a></Link></li>
                                    <li><Link href="/estado/RN"><a className="dropdown-item" href="#">Rio Grande do Norte</a></Link></li>
                                    <li><Link href="/estado/SE"><a className="dropdown-item" href="#">Sergipe</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="centro-oeste" role="button" data-bs-toggle="dropdown">Centro-Oeste</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/DF"><a className="dropdown-item" href="#">Distrito Federal</a></Link></li>
                                    <li><Link href="/estado/GO"><a className="dropdown-item" href="#">Goiás</a></Link></li>
                                    <li><Link href="/estado/MT"><a className="dropdown-item" href="#">Mato Grosso</a></Link></li>
                                    <li><Link href="/estado/MS"><a className="dropdown-item" href="#">Mato Grosso do Sul</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="sudeste" role="button" data-bs-toggle="dropdown">Sudeste</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/ES"><a className="dropdown-item" href="#">Espírito Santo</a></Link></li>
                                    <li><Link href="/estado/MG"><a className="dropdown-item" href="#">Minas Gerais</a></Link></li>
                                    <li><Link href="/estado/RJ"><a className="dropdown-item" href="#">Rio de Janeiro</a></Link></li>
                                    <li><Link href="/estado/SP"><a className="dropdown-item" href="#">São Paulo</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="sul" role="button" data-bs-toggle="dropdown">Sul</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/PR"><a className="dropdown-item" href="#">Paraná</a></Link></li>
                                    <li><Link href="/estado/RS"><a className="dropdown-item" href="#">Rio Grande do Sul</a></Link></li>
                                    <li><Link href="/estado/SC"><a className="dropdown-item" href="#">Santa Catarina</a></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main className="container my-3">
            <div className="card">
                <div className="card-body texto">
                    <h1>Sobre o painel</h1>
                    <p>Este painel tem como finalidade mostrar dados sobre a COVID-19 no Brasil e nos Estados.</p>
                    <p>Os dados de população estimada são obtidos através do IBGE (Instituto Brasileiro de Geografia e Estatística), disponível <a href="https://servicodados.ibge.gov.br/api/docs/projecoes" target="_blank">aqui</a>.</p>
                    <p>Os dados de casos confirmados e mortes são obtidos através de uma fonte pública de dados, disponível <a href="https://covid19-brazil-api-docs.vercel.app/" target="_blank">aqui</a>.</p>
                    <p>Desenvolvido por <a href="https://github.com/bruno1409" target="_blank">Bruno Martins</a> com Next.js e hospedado gratuitamente na Vercel.</p>
                    <p><a href="https://github.com/bruno1409/painel-covid-19" target="_blank">Código-fonte do painel</a></p>
                </div>
            </div>
            <code><p className="text-center mt-3"><i className="fas fa-code fa-fw"></i> Versão 1.3 | <i className="fas fa-calendar fa-fw"></i> 05 de junho de 2021</p></code>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
    </>)
}