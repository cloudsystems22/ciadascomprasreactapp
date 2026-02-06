import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, 
  faMapMarkerAlt, 
  faLock, 
  faCheckCircle, 
  faFileUpload,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useOnScreen } from "./useOnScreen";

export default function Register() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useOnScreen(formRef, "-50px");

  const [formData, setFormData] = useState({
    nome: "",
    fantasia: "",
    cnpj: "",
    contato: "",
    email: "",
    emailFinanceiro: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    complemento: "",
    estado: "",
    cidade: "",
    senha: "",
    confirmaSenha: "",
    segmento: [] as string[],
    aceite: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Funcionalidade de cadastro em desenvolvimento.");
  };

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Header */}
      <section className="relative pt-32 pb-12 bg-slate-900 text-white">
         <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Cadastro de Comprador</h1>
            <p className="text-gray-400">Preencha os dados abaixo para criar sua conta.</p>
         </div>
      </section>

      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <div ref={formRef} className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-700 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
                
                {/* Section: Dados da Empresa */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                        <FontAwesomeIcon icon={faBuilding} className="text-blue-600" /> Dados da Empresa
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Razão Social *</label>
                            <input type="text" name="nome" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Nome da Empresa" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Nome Fantasia</label>
                            <input type="text" name="fantasia" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Nome Fantasia" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">CNPJ *</label>
                            <input type="text" name="cnpj" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="00.000.000/0000-00" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Contato</label>
                            <input type="text" name="contato" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Nome do responsável" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Logo</label>
                            <div className="relative">
                                <input type="file" className="hidden" id="logo-upload" />
                                <label htmlFor="logo-upload" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <FontAwesomeIcon icon={faFileUpload} /> Escolher arquivo...
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Contato e Endereço */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600" /> Contato e Endereço
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">E-mail Principal *</label>
                            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="email@empresa.com.br" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">E-mail Financeiro</label>
                            <input type="email" name="emailFinanceiro" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="financeiro@empresa.com.br" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Telefone *</label>
                            <input type="tel" name="telefone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="(00) 0000-0000" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">CEP *</label>
                            <div className="flex gap-2">
                                <input type="text" name="cep" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="00000-000" onChange={handleInputChange} />
                                <button type="button" className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-bold hover:bg-blue-200 transition-colors">Buscar</button>
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700">Endereço *</label>
                            <input type="text" name="endereco" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Rua, Av..." onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Número *</label>
                                <input type="text" name="numero" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="123" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Complemento</label>
                                <input type="text" name="complemento" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Sala, Bloco..." onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Bairro</label>
                            <input type="text" name="bairro" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Bairro" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Estado *</label>
                                <select name="estado" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" onChange={handleInputChange}>
                                    <option value="">UF</option>
                                    <option value="SP">SP</option>
                                    <option value="RJ">RJ</option>
                                    <option value="MG">MG</option>
                                    {/* Outros estados */}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Cidade *</label>
                                <select name="cidade" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" onChange={handleInputChange}>
                                    <option value="">Selecione</option>
                                    {/* Cidades carregadas via API */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Acesso */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                        <FontAwesomeIcon icon={faLock} className="text-blue-600" /> Dados de Acesso
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Senha *</label>
                            <input type="password" name="senha" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Mínimo 6 caracteres" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Confirmar Senha *</label>
                            <input type="password" name="confirmaSenha" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50" placeholder="Repita a senha" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

                {/* Section: Segmento */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Segmento de Atuação</h3>
                    <p className="text-sm text-gray-500 mb-4">Marque seu segmento de maior interesse (você ainda poderá realizar compras em todos os outros).</p>
                    <div className="flex flex-wrap gap-4">
                        {['Linha Leve', 'Linha Pesada', 'Motos', 'Acessórios', 'Funilaria', 'Elétrica'].map((seg) => (
                            <label key={seg} className="inline-flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm font-medium text-gray-700">{seg}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Section: Contrato */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">Termos de Uso</h3>
                    <div className="h-40 overflow-y-auto p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 leading-relaxed text-justify">
                        <p className="font-bold mb-2">CONTRATO E TERMOS DE ADESÃO</p>
                        <p>
                            1. SISTEMA DE PROMOÇÃO DE VENDAS.<br/>
                            1.1. Cia das Compras (S R BASTOS TEC LTDA), inscrito no CNPJ sob o nº 046396000001-55...
                            (Texto completo do contrato aqui...)
                        </p>
                        {/* ... resto do texto do contrato ... */}
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="aceite" required className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300" onChange={handleCheckboxChange} />
                            <span className="text-sm font-medium text-gray-700">Li e aceito todos os termos do contrato acima.</span>
                        </label>
                    </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-lg">
                    <FontAwesomeIcon icon={faCheckCircle} /> Finalizar Cadastro
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}
