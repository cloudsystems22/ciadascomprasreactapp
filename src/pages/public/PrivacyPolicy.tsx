import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { useOnScreen } from "./useOnScreen";

export default function PrivacyPolicy() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useOnScreen(headerRef, "-50px");

  const contentRef = useRef<HTMLDivElement>(null);
  const isContentVisible = useOnScreen(contentRef, "-50px");

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center" ref={headerRef}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 backdrop-blur-sm">
                <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-blue-300" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Política de Privacidade
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               Transparência e segurança no tratamento dos seus dados.
            </p>
         </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 -mt-10 relative z-20 max-w-4xl">
        <div ref={contentRef} className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 transition-all duration-1000 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="prose prose-lg max-w-none text-gray-600 text-justify">
                <p>
                    Bem-vindo ao portal de acesso Cia das Compras, a seguir apresentaremos a você (Usuário) as Políticas de Privacidade de nossos Serviços e Produtos, ofertados por meio do Cia das Compras com as regras e condições para utilização destes e suas funcionalidades.
                </p>
                <p>
                    Ao visitar ou utilizar os Serviços e Produtos ofertado através do Cia das Compras, pressupõe-se a leitura e concordância com toda Política de Privacidade abaixo, bem como com o TERMOS E CONDIÇÕES CONTRATUAIS PARA ADESÃO AO SISTEMA DE PROMOÇÃO DE VENDAS - CIA DAS COMPRAS.
                </p>
                <p>
                    Caso esteja usando os Serviços e/ou Produtos em nome de uma pessoa jurídica, o Usuário atesta que possui plenos poderes para atuação em nome da empresa, declarando ter poderes para vinculá-la a Política de Privacidade.
                </p>
                
                <hr className="my-8 border-gray-200" />

                <p>
                    Na Cia das Compras, privacidade e segurança são prioridades e nos comprometemos com a transparência do tratamento de dados pessoais dos nossos usuários/clientes. Por isso, a presente Política de Privacidade estabelece como é feita a coleta, uso e transferência de informações de clientes ou outras pessoas que acessam ou usam nosso site.
                </p>
                <p>
                    Ao utilizar nossos serviços, você entende que coletaremos e usaremos suas informações pessoais nas formas descritas nesta Política, sob as normas de Proteção de Dados (LGPD, Lei Federal 13.709/2018) e as demais normas do ordenamento jurídico brasileiro aplicáveis.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Empresa</h2>
                <p>
                    Dessa forma, a S. R. BASTOS TECNOLOGIA LTDA., doravante denominada simplesmente como “Cia das Compras”, inscrita no CNPJ/MF sob o nº 04639600/0001-55, no papel de Controladora de Dados, obriga-se ao disposto na presente Política de Privacidade.
                </p>

                <hr className="my-8 border-gray-200" />

                <p>
                    1. Para que a Política de Privacidade seja bem compreendida, é fundamental esclarecer alguns conceitos importantes:
                    <br/>
                    - Cliente/Usuário – toda pessoa física e/ou jurídica que adquire produtos por meio da plataforma Cia das Compras ou de alguma forma utiliza nossa plataforma.
                </p>
                <p>
                    <strong>- Dados pessoais – </strong> qualquer informação relacionada a uma pessoa física e/ou jurídica que a identifique ou que, usada em combinação com outras informações tratadas, identifique um indivíduo. Ainda, qualquer informação por meio da qual seja possível identificar uma pessoa ou entrar em contato com ela.
                </p>
                <p>
                    <strong>- Tratamento de dados pessoais – </strong> considera-se tratamento de dado pessoal a coleta, recepção, classificação, utilização, acesso, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, comunicação, transferência, difusão ou extração de dados de pessoas físicas /ou jurídicas.
                </p>
                <p>
                    <strong>- Titular de dados – </strong> qualquer pessoa física e/ou jurídica que tenha seus dados pessoais tratados pela Cia das Compras;
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    - TERMOS E CONDIÇÕES CONTRATUAIS PARA ADESÃO AO SISTEMA DE PROMOÇÃO DE VENDAS - CIA DAS COMPRAS -
                </h2>
                <p>
                    constituem os termos legais que regulamentam a relação entre a Cia das Compras, o Estabelecimento Parceiro/Fornecedores (“sellers”) e os Compradores.
                </p>

                <hr className="my-8 border-gray-200" />

                <p>
                    <strong>- Cookies - </strong>arquivos enviados pelo servidor dos Serviços e/ou Produtos para o computador ou dispositivo dos Usuários, com a finalidade de identificar o dispositivo e obter dados de acesso, como páginas navegadas ou links clicados, permitindo, desta forma, personalizar a navegação dos Usuários nos Serviços e/ou Produtos, de acordo com o seu perfil.
                </p>
                <p>
                    <strong>- IP - </strong>abreviatura de Internet Protocol. É um conjunto de caracteres, frequentemente numéricos, que identifica o computador e dispositivos dos Usuários na Internet.
                </p>
                <p>
                    <strong>- Link - </strong> - atalho de acesso a um Portal.
                </p>
                <p>
                    <strong>- Logs - </strong> - registros de atividades dos Usuários efetuadas nos Serviços e/ou Produtos.
                </p>
                <p>
                    <strong>- “Permission Marketing” - </strong> pedido de autorização, enviado por e-mail ao Usuário, requerendo autorização para o envio subsequente de mensagem com fins comerciais da empresa.
                </p>
                <p>
                    <strong>- Produtos - </strong> Conteúdo, notícias, informações e ferramentas de relacionamento com o Cia da Compras, destinado aos Usuários. Por exemplo, as notícias apresentadas no Cia das Compras.
                </p>
                <p>
                    <strong>- Serviços - </strong> conjunto de funcionalidades disponibilizados pela EMPRESA através do Cia das Compras. Por exemplo, o acesso aos produtos e serviços.
                </p>
                <p>
                    <strong>- Usuário(s) - </strong> pessoas que acessam e/ou se cadastram a um dos Serviços e/ou Produtos ofertados através do Portal Cia das Compras.
                </p>
                <p>
                    2. Nosso site coleta e utiliza alguns dados pessoais seus, de forma a viabilizar a utilização da plataforma pelas pessoas físicas e/ou jurídicas e aprimorar a experiência de uso.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Obtenção dos dados e informações</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                       Os dados e informações serão obtidos quando o Usuário inserir informações voluntariamente no Serviços e/ou Produtos, na interação com as ferramentas e interfaces dos dispositivos dos Usuários, na frequência de acesso, no contato por meio dos canais de acesso disponíveis ou por meio de cookies, e quando os Usuários se cadastram nos Serviços, Produtos ou participam das nossas promoções.
                    </li>
                    <li>
                        Ao tomar conhecimento de alguma promoção realizada pela EMPRESA, consulte nossos canais oficiais para verificar sua veracidade. Caso a informação seja equivocada, desconsidere-a.
                    </li>
                    <li>
                       Para cada uma das modalidades de coleta de dados poderão ser solicitadas diferentes informações, de acordo com a finalidade da coleta. Assim, os Usuários serão sempre informados sobre os dados que estão sendo coletados, ficando a seu critério fornecê-los ou não, e, em cada caso, serão avisados também sobre as consequências de sua decisão.
                    </li>
                    <li>
                        O Usuário garante a veracidade e exatidão dos dados pessoais que fornece ao nossos Serviços e/ou Produtos, ou seja, a empresa não tem qualquer responsabilidade no caso de inserção de dados falsos ou inexatidão dos dados pessoais introduzidos pelo Usuário em nossos Serviços e/ou Produtos.
                    </li>
                    <li>
                        O Usuário que introduzir seus dados pessoais identificáveis poderá, a qualquer momento alterar e corrigir como for conveniente para este, bastando, para tanto, fazê-las através de seu próprio cadastro no Cia das Compras. O Usuário, em hipótese alguma, deverá fornecer seus dados por e-mail, por se tratar de um ambiente sem os requisitos adequados de segurança. Desta forma a empresa exime-se de quaisquer responsabilidades quanto à correção, alteração ou remoção de dados.
                    </li>
                    <li>
                        Por razões de segurança, certas alterações cadastrais, incluindo todos os dados referentes ao cadastro de assinantes aos Serviços ou aos Produtos, só podem ser feitas com identificação por meio de e-mail e senhas.
                    </li>
                </ol>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2.2. Quais dados são coletados</h2>
                <p>
                   Quais dados são coletados - Razão Social, CNPJ, CPF e RG do responsável da empresa, e-mail, telefone e endereço completo, seguimento comercial, informações bancárias – dados importantes para que haja intermediação de negócios entre os “sellers”fornecedores e compradores, pagamentos, bem como para entrega dos produtos;
                   <br/>Forma de coleta - Formulário web;
                   <br/>Finalidade da coleta - Permitir acesso ao site para os benefícios do software, e cobrança da utilização (uso sigiloso e estritamente interno);
                   <br/>Armazenar/arquivar - Por meio de banco de dados MySQL;
                   <br/>Compartilhamento e motivo - Os dados não são compartilhados com ninguém (uso sigiloso e estritamente interno);
                   <br/>Exclusão - Na rescisão do contrato de serviços do software: podendo ser desativado.
                </p>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2.3. Consentimento</h2>
                <p>
                    É a partir do seu consentimento que tratamos os seus dados pessoais. O consentimento é a manifestação livre, informada e inequívoca pela qual você autoriza a Cia das Compras a tratar seus dados.
                </p>
                <p>
                    O seu consentimento será obtido no momento do preenchimento do formulário web, conforme acima descrito, evidenciando o compromisso de transparência e boa-fé da Cia das Compras para com seus “sellers” fornecedores/clientes/compradores, seguindo as regulações legislativas pertinentes.
                </p>
                <p>
                   Ao utilizar os serviços da Cia das Compras e fornecer seus dados pessoais, você está ciente e consentindo com as disposições desta Política de Privacidade, além de conhecer seus direitos e como exercê-los.
                   A qualquer tempo e sem nenhum custo, você poderá revogar seu consentimento.
                </p>
                <p>
                  Aplica-se a todos os usuários da plataforma Cia das Compras, sellers?/fornecedores/clientes/compradores, bem como àqueles que de alguma forma tenham os dados pessoais tratados por nós. A utilização da nossa plataforma implica na aceitação desta Política de Privacidade.
                </p>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Finalidades do uso dos Dados e Informações</h2>
                <p>
                  3.1. Os dados e informações coletados dos Usuários poderão ser utilizados para as seguintes finalidades:
                </p>
                <p>
                   Assim, em consonância com a Lei Geral de Proteção de Dados, seus dados só serão coletados, tratados e armazenados mediante prévio e expresso consentimento.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Responder a eventuais dúvidas e solicitações do Usuário.</li>
                    <li>Requisitos legais e regulatórias: seus dados poderão ser utilizados para endereçarmos reivindicações jurídicas, administrativas e regulatórias relacionadas à utilização dos nossos serviços</li>
                    <li>Garantir a segurança dos Usuários e administradores.</li>
                    <li>Manter atualizados os cadastros dos Usuários e administradores para fins de contato por telefone fixo, celular, e-mail, SMS, mala direta, redes sociais ou por outros meios de comunicação.</li>
                    <li>Realizar o enriquecimento da base de dados dos Usuários com a finalidade de customização dos Serviços e/ou Produtos, melhor atendimento, promoção dos Serviços e/ou Produtos e desenvolvimento de novos produtos.</li>
                    <li>Promover o respectivo Serviço e/ou Produto e seus parceiros, comerciais ou não, e informar sobre novas oportunidades e benefícios para o Usuário.</li>
                    <li>Gerar análises e estudos, sejam estatísticos ou identificáveis, com base no comportamento de uso dos Serviços e dos Produtos.</li>
                    <li>Aperfeiçoar o uso e a experiência interativa durante a navegação do Usuário nos Serviços e/ou Produtos bem como das demais ferramentas e plataformas lançadas pela empresa.</li>
                    <li>Aprimorar o funcionamento dos Serviços e/ou Produtos bem como das demais ferramentas e plataformas lançadas pela empresa e/ou seus parceiros, comerciais ou não, que se relacionam, direta ou indiretamente, aos Serviços e/ou Produtos ou ao seu ambiente e propostas.</li>
                </ul>
                <p>
                    Esse tratamento inclui a utilização de dados para: criar e atualizar sua conta; permitir o preparo e a entrega dos pedidos pelos Estabelecimentos Parceiros; personalizar sua conta; e prover operações internas necessárias. Também poderemos usar seus dados pessoas para fins internos, tais quais auditoria, análise de dados e pesquisa de aprimoramento dos produtos, serviços e comunicações com os clientes, bem como a geração de análise estatísticas em respeito ao uso dos nossos serviços, incluindo tendências de consumo.
                </p>
                <p>
                   Gerenciamento de pagamentos efetuados online: segurança da informação e compliance com a legislação financeira é uma das grandes preocupações da Cia das Compras. Por isso, armazenamos suas informações financeiras apenas de forma anonimizada, o que nos impede de ter acesso a seus dados financeiros completos. Além disso, somente processamos seus dados para a finalidade especificada, qual seja, a de permitir que uma transação seja efetuada online com cobrança para você. Não se preocupe: Cia das Compras nunca processará suas informações financeiras e/ou bancárias de forma a desrespeitar as normas de compliance aplicáveis.
                </p>
                <p>
                   Segurança e prevenção à fraudes: nós também podemos utilizar seus dados pessoais para aprimorar a nossa segurança e melhorar os serviços e as ofertas da Cia das Compras destinadas à você. Desta forma, podemos analisar e solucionar problemas técnicos, bem como identificar e coibir fraudes na utilização do nosso serviço.
                </p>
                <p>
                   O Usuário receberá um pedido de autorização “Permission Marketing”, através do e-mail cadastrado junto à empresa, requerendo autorização para o envio subsequente de mensagem com fins comerciais.
                </p>
                <p>
                   As newsletters e mensagens publicitárias enviadas por e-mail trarão, obrigatoriamente, opção de cancelamento do envio daquele tipo de mensagem por parte da empresa. A solicitação será atendida em até 48 horas.
                </p>
                <p>
                   Os serviços de envio de e-mails poderão ser realizados por empresa contratada pela EMPRESA, que utiliza seus próprios servidores para realizar o envio.
                </p>
                <p>
                   A empresa contratada não armazena nem utiliza, de nenhuma forma e sob nenhuma hipótese, os e-mails do cadastro dos Serviços e/ou Produtos para qualquer outro fim que não o envio das mensagens, de acordo com as preferências de cada Usuário registradas nos Serviços e/ou Produtos.
                </p>
                <p>
                   A base de dados sensíveis formada pela empresa por meio da coleta de dados dos Serviços e/ou Produtos não será vendida, cedida, transferida, alugada ou compartilhada com terceiros sem a devida autorização do cliente.
                </p>
                <p>
                  A utilização da base de dados será restrita às empresas do mesmo grupo econômico do EMPRESA ou parceiros de negócios, respeitando a necessidade a que serão submetidos, a relevância para os objetivos dos Serviços e/ou Produtos e aos interesses dos Usuários, além de preservar sua privacidade.
                </p>
                <p>
                    Caso o Usuário deixe de utilizar os Serviços e/ou os Produtos, a empresa poderá, para fins de auditoria e preservação de direitos, permanecer com o registro de dados e informações do Usuário, pelo período que julgar conveniente, a não ser que seja exigido a mantê-los por período maior por motivo legal, ordem de autoridade ou judicial, possuindo a faculdade de excluí-los definitivamente após o período mínimo de 12 (doze) meses de guarda, nos termos da lei.
                </p>
                <p>
                    O Usuário poderá exigir da empresa os dados registrados que lhe dizem respeito, da mesma forma que poderá solicitar sua alteração ou exclusão. O Usuário deve entrar em contato através dos meios disponibilizados pelos Serviços ou Produtos para solicitar essas providências. O pedido de exclusão de dados feito pelo Usuário será atendido após vencido o prazo de prescrição legal relacionada a eventuais provas legais que possam estar relacionados.
                </p>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Como e por quanto tempo seus dados serão armazenados?</h2>
                <p>
                    Seus dados pessoais coletados pela Cia das Compras serão utilizados e armazenados durante o tempo necessário para a prestação do serviço ou para que as finalidades elencadas na presente Política de Privacidade sejam atingidas, considerando os direitos dos titulares dos dados e dos controladores.
                </p>
                <p>
                   De modo geral, seus dados serão mantidos enquanto a relação contratual entre os “Sellers”/fornecedores, Compradores e a Cia das Compras perdurar. Findado o período de armazenamento dos dados pessoais, estes serão excluídos de nossas bases de dados ou anonimizados, ressalvadas as hipóteses legalmente previstas na Lei Geral de Proteção de Dados.
                </p>
                <p>
                  Isto é, informações pessoais sobre você que sejam imprescindíveis para o cumprimento de determinações legais, judiciais e administrativas e/ou para o exercício do direito de defesa em processos judiciais e administrativos serão mantidas, a despeito da exclusão dos demais dados.
                </p>
                <p>
                  O armazenamento de dados coletados pela Cia das Compras reflete o nosso compromisso com a segurança e privacidade dos seus dados. Empregamos medidas e soluções técnicas de proteção aptas a garantir a confidencialidade, integridade e inviolabilidade dos seus dados. Além disso, também contamos com medidas de segurança apropriadas aos riscos e com controle de acesso às informações armazenadas.
                </p>
                <p>
                  Os dados e informações coletados estarão armazenados em ambiente seguro, observado o estado da técnica disponível, e somente poderão ser acessadas por pessoas qualificadas e autorizadas pela empresa. Aqueles que se utilizarem indevidamente dessas informações, ferindo nossa Política de Privacidade, estarão sujeitos às penalidades previstas em nossas Políticas, sem exclusão das demais medidas legais cabíveis.
                </p>
                <p>
                  Considerando que nenhum sistema de segurança é absolutamente seguro, a empresa exime-se de quaisquer responsabilidades por eventuais danos e/ou prejuízos decorrentes de falhas, vírus ou invasões do banco de dados dos Serviços e/ou Produtos, salvo nos casos em que tiver agido com dolo ou culpa.
                </p>
                <p>
                  Em caso de incidentes de segurança que possa gerar risco ou dano relevante para você ou qualquer um de nossos usuários/clientes, comunicaremos aos afetados e a Autoridade Nacional de Proteção de Dados sobre o ocorrido, em consonância com as disposições da Lei Geral de Proteção de Dados.
                </p>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Com quem seus dados podem ser compartilhados?</h2>
                <p>
                  Em caso de incidentes de segurança que possa gerar risco ou dano relevante para você ou qualquer um de nossos usuários/clientes, comunicaremos aos afetados e a Autoridade Nacional de Proteção de Dados sobre o ocorrido, em consonância com as disposições da Lei Geral de Proteção de Dados.
                </p>
                <p>
                    Tendo em vista a preservação de sua privacidade, a Cia das Compras não compartilhará seus dados pessoais com nenhum terceiro não autorizado.
                </p>
                <p>
                    Seus dados poderão ser compartilhados com nossos parceiros comerciais (“sellers”/fornecedores e compradores).
                </p>
                <p>
                   Todavia, nossos parceiros têm suas próprias Políticas de Privacidade, que podem divergir desta. Recomendamos que sejam solicitados a cada um, sempre que entenderem necessário.
                </p>
                <p>
                    Além disso, também existem outras hipóteses em que seus dados poderão ser compartilhados, que são:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Determinação legal, requerimento, requisição ou ordem judicial, com autoridades judiciais, administrativas ou governamentais competentes.</li>
                    <li>Caso de movimentações societárias, como fusão, aquisição e incorporação, de forma automática.</li>
                    <li>Proteção dos direitos da Cia das Compras em qualquer tipo de conflito, inclusive os de teor judicial.</li>
                </ol>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies ou dados de navegação</h2>
                <p>
                    A Cia das Compras faz uso de Cookies, que são arquivos de texto enviados pela plataforma ao seu computador e que nele se armazenam, que contém informações relacionadas à navegação do site. Em suma, os Cookies são utilizados para aprimorar a experiência de uso.
                </p>
                <p>
                   Ao acessar nosso site e consentir com o uso de Cookies, você manifesta conhecer e aceitar a utilização de um sistema de coleta de dados de navegação com o uso de Cookies em seu dispositivo.
                </p>
                <p>
                  Você pode, a qualquer tempo e sem nenhum custo, alterar as permissões, bloquear ou recusar os Cookies. Todavia, a revogação do consentimento de determinados Cookies pode inviabilizar o funcionamento correto de alguns recursos da plataforma.
                </p>
                <p>
                  Para gerenciar os cookies do seu navegador, basta fazê-lo diretamente nas configurações do navegador, na área de gestão de Cookies.
                </p>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Alteração desta Política de Privacidade</h2>
                <p>
                 A atual versão da Política de Privacidade foi formulada e atualizada pela última vez em: (12/04/2022)
                </p>
                <p>
                 Reservamos o direito de modificar essa Política de Privacidade a qualquer tempo, principalmente em função da adequação a eventuais alterações feitas em nosso site ou em âmbito legislativo. Recomendamos que sejam revisadas com frequência.
                </p>
                <p>
                 Eventuais alterações entrarão em vigor a partir de sua publicação em nosso site e sempre lhe notificaremos acerca das mudanças ocorridas.
                </p>
                <p>
                 Ao utilizar nossos serviços e fornecer seus dados pessoais após tais modificações, o consentimento é automático.
                </p>
                <p>
                 Os Usuários deverão entrar em contato em caso de qualquer dúvida com relação às disposições constantes desta Política de Privacidade através dos meios de comunicação disponibilizados nos respectivos Serviços e/ou Produtos.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
}
