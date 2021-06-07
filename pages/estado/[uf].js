import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticPaths() {
    return {
        paths: [
            { params: { uf: 'AC' } },
            { params: { uf: 'AL' } },
            { params: { uf: 'AM' } },
            { params: { uf: 'AP' } },
            { params: { uf: 'BA' } },
            { params: { uf: 'CE' } },
            { params: { uf: 'DF' } },
            { params: { uf: 'ES' } },
            { params: { uf: 'GO' } },
            { params: { uf: 'MA' } },
            { params: { uf: 'MG' } },
            { params: { uf: 'MS' } },
            { params: { uf: 'MT' } },
            { params: { uf: 'PA' } },
            { params: { uf: 'PB' } },
            { params: { uf: 'PE' } },
            { params: { uf: 'PI' } },
            { params: { uf: 'PR' } },
            { params: { uf: 'RJ' } },
            { params: { uf: 'RN' } },
            { params: { uf: 'RO' } },
            { params: { uf: 'RR' } },
            { params: { uf: 'RS' } },
            { params: { uf: 'SC' } },
            { params: { uf: 'SE' } },
            { params: { uf: 'SP' } },
            { params: { uf: 'TO' } }
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    const get = context.params.uf;

    // API pública COVID-19
    const api_covid = await fetch(`https://covid19-brazil-api.vercel.app/api/report/v1/brazil/uf/${get}`);
    const json_covid = await api_covid.json();
    const uid = json_covid.uid;
    const uf = json_covid.uf;
    const estado = json_covid.state;
    const confirmados = json_covid.cases;
    const mortes = json_covid.deaths;
    const atualizacao = json_covid.datetime;
    const data = new Date(atualizacao).toLocaleDateString("pt-BR", { dateStyle: 'short' });
    const hora = new Date(atualizacao).toLocaleDateString("pt-BR", { timeStyle: 'short' });

    // API pública IBGE
    const api_ibge = await fetch(`https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/${uid}`);;
    const json_ibge = await api_ibge.json();
    const populacao = json_ibge.projecao.populacao;

    return {
        props: {
            populacao, uf, estado, confirmados, mortes, data, hora
        },
        revalidate: 120,
    }
}

export default function Home({populacao, uf, estado, confirmados, mortes, data, hora}) {
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Painel COVID-19 - {estado}</title>
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
            <div className="alert alert-secondary mb-4"><i className="fas fa-info-circle fa-fw"></i> Este painel apresenta uma visão resumida e simplificada contendo apenas o número de casos confirmados e de mortes por abrangência, sendo Nacional ou Estadual.</div>
            <div className="row text-center">
                <div className="col-sm-12 col-md-6">
                    <Image src={`/${uf.toLowerCase()}.png`} height="500" width="496"/>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="row">
                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <h1><i className="fas fa-map-marker-alt fa-fw"></i> Estado</h1>
                                    <p>{estado} ({uf})</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <h1><i className="fas fa-users fa-fw"></i> População Estimada</h1>
                                    <p className="m-0">{populacao.toLocaleString('pt-BR')}</p>
                                    <small>Fonte: <abbr title="Instituto Brasileiro de Geografia e Estatística">IBGE</abbr></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <h1><i className="fas fa-virus fa-fw"></i> Casos Confirmados</h1>
                                    <p>{confirmados.toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <h1><i className="fas fa-briefcase-medical fa-fw"></i> Mortes</h1>
                                    <p className="mortes">{mortes.toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer className="container mt-4">
            <p><i className="fas fa-clock fa-fw"></i> Última atualização dos dados: {data} às {hora}</p>
            <p><i className="fas fa-laptop-medical fa-fw"></i> Dados do Ministério da Saúde e Secretarias Estaduais de Saúde</p>
            <hr/>
            <p><Link href="/sobre"><a>Sobre o painel</a></Link></p>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
    </>)
}