import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export async function getServerSideProps(context) {
    const estados = ['ac', 'al', 'am', 'ap', 'ba', 'ce', 'df', 'es', 'go', 'ma', 'mg', 'ms', 'mt', 'pa', 'pb', 'pe', 'pi', 'pr', 'rj', 'rn', 'ro', 'rr', 'rs', 'sc', 'se', 'sp', 'to'];
    const get = context.params.uf;

    if (!estados.includes(get)) {
        return {
            notFound: true
        }
    }

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

    const porcentagem = ((confirmados / populacao) * 100).toFixed(2);

    return {
        props: {
            populacao, uf, estado, confirmados, mortes, data, hora, porcentagem
        }
    }
}

export default function Home({populacao, uf, estado, confirmados, mortes, data, hora, porcentagem}) {
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
                                    <li><Link href="/estado/ac"><a className="dropdown-item" href="#">Acre</a></Link></li>
                                    <li><Link href="/estado/ap"><a className="dropdown-item" href="#">Amapá</a></Link></li>
                                    <li><Link href="/estado/am"><a className="dropdown-item" href="#">Amazonas</a></Link></li>
                                    <li><Link href="/estado/pa"><a className="dropdown-item" href="#">Pará</a></Link></li>
                                    <li><Link href="/estado/ro"><a className="dropdown-item" href="#">Rondônia</a></Link></li>
                                    <li><Link href="/estado/rr"><a className="dropdown-item" href="#">Roraima</a></Link></li>
                                    <li><Link href="/estado/to"><a className="dropdown-item" href="#">Tocantins</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="nordeste" role="button" data-bs-toggle="dropdown">Nordeste</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/al"><a className="dropdown-item" href="#">Alagoas</a></Link></li>
                                    <li><Link href="/estado/ba"><a className="dropdown-item" href="#">Bahia</a></Link></li>
                                    <li><Link href="/estado/ce"><a className="dropdown-item" href="#">Ceará</a></Link></li>
                                    <li><Link href="/estado/ma"><a className="dropdown-item" href="#">Maranhão</a></Link></li>
                                    <li><Link href="/estado/pb"><a className="dropdown-item" href="#">Paraíba</a></Link></li>
                                    <li><Link href="/estado/pe"><a className="dropdown-item" href="#">Pernambuco</a></Link></li>
                                    <li><Link href="/estado/pi"><a className="dropdown-item" href="#">Piauí</a></Link></li>
                                    <li><Link href="/estado/rn"><a className="dropdown-item" href="#">Rio Grande do Norte</a></Link></li>
                                    <li><Link href="/estado/se"><a className="dropdown-item" href="#">Sergipe</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="centro-oeste" role="button" data-bs-toggle="dropdown">Centro-Oeste</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/df"><a className="dropdown-item" href="#">Distrito Federal</a></Link></li>
                                    <li><Link href="/estado/go"><a className="dropdown-item" href="#">Goiás</a></Link></li>
                                    <li><Link href="/estado/mt"><a className="dropdown-item" href="#">Mato Grosso</a></Link></li>
                                    <li><Link href="/estado/ms"><a className="dropdown-item" href="#">Mato Grosso do Sul</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="sudeste" role="button" data-bs-toggle="dropdown">Sudeste</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/es"><a className="dropdown-item" href="#">Espírito Santo</a></Link></li>
                                    <li><Link href="/estado/mg"><a className="dropdown-item" href="#">Minas Gerais</a></Link></li>
                                    <li><Link href="/estado/rj"><a className="dropdown-item" href="#">Rio de Janeiro</a></Link></li>
                                    <li><Link href="/estado/sp"><a className="dropdown-item" href="#">São Paulo</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="sul" role="button" data-bs-toggle="dropdown">Sul</a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/estado/pr"><a className="dropdown-item" href="#">Paraná</a></Link></li>
                                    <li><Link href="/estado/rs"><a className="dropdown-item" href="#">Rio Grande do Sul</a></Link></li>
                                    <li><Link href="/estado/sc"><a className="dropdown-item" href="#">Santa Catarina</a></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main className="container my-4">
            <div className="row text-center">
                <div className="col-sm-12 col-md-7">
                    <Image src={`/${uf.toLowerCase()}.png`} height="500" width="496"/>
                </div>
                <div className="col-sm-12 col-md-5">
                    <div className="row">
                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body pb-0">
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
                                    <p className="m-0">{confirmados.toLocaleString('pt-BR')}</p>
                                    <small>{porcentagem.replace('.', ',')}% da População Estimada</small>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="card">
                                <div className="card-body pb-0">
                                    <h1><i className="fas fa-briefcase-medical fa-fw"></i> Mortes</h1>
                                    <p className="mortes">{mortes.toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-3"><i className="fas fa-clock fa-fw"></i> Última atualização: {data} às {hora}</p>
                </div>
            </div>
        </main>
        <footer className="container mt-4">
            <hr/>
            <p><Link href="/sobre"><a>Sobre o painel</a></Link></p>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
    </>)
}