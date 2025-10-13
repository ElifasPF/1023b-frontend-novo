import { useNavigate, useSearchParams } from "react-router-dom"
import api from "../../api/api"
function Login() {
    const navigate = useNavigate()
    // url localhost:5173/login?mensagem=Token Inválido
    // para pegar a mensagem passada pela url usamos o useSearchParams
    const [searchParams] = useSearchParams()
    // Dentro do searchParams eu consigo utilizar o get para pegar
    //o valor da variável passada pela url
    const mensagem = searchParams.get('mensagem')

    // Função chamada quando clicamos no botão do formulário
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // Vamos pegar o que a pessoa digitou no formulário
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const senha = formData.get("senha")
        
        // Chamar a API.post para mandar o login e senha
        api.post('/login', {
            email,
            senha
        }).then(resposta => {
            if (resposta.status === 200) {
                localStorage.setItem('token', resposta?.data?.token)
                navigate('/')
            }
            else if(resposta.status === 400) {
                navigate(`/login?menssagem=${resposta?.data?.menssagem}`)
            }
        })

        // Ver a resposta da API se deu certo e 
        
        // salvar o TOKEN no localStorage

        // redirecionar para a página inicial 
    }
        


    return(
    <>
    <h1>Login</h1>
    {mensagem && <p>mensagem</p>}
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" id="email" />
            <input type="password" name="senha" id="senha" />
            <button type="submit">Entrar</button>
        </form>
    </>
    )
}
export default Login