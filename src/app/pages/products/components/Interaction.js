'use client'
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Button, Text, VStack, Flex, Spinner, Input, Select } from '@chakra-ui/react';
import { FaRobot } from "react-icons/fa";

const perguntas = [
  {
    texto: 'Olá! Qual seu nome completo?',
    tipo: 'input',
    placeholder: 'Digite seu nome completo',
  },
  {
    texto: 'Qual seu telefone?',
    tipo: 'numero',
    placeholder: 'Digite seu telefone',
  },
  {
    texto: 'Qual sua profissão?',
    tipo: 'select',
    opcoes: ['Selecione uma profissão', 'Servidor público',
      'Forças Armadas',
      'Funcionário de empresa privada (CLT)',
      'Autônomo',
      'Aposentado ou pensionista'],
  },
  {
    texto: 'Qual produto você gostaria de adquirir?',
    tipo: 'botoes',
    opcoes: [
      // 'Crédito Consignado',
      // 'Cartão Beneficio',
      'FGTS',
      'Outros Produtos',
      // 'Credito Imobiliário (CGI e Aquisição)',
      // 'Crédito Pessoal',
      // 'Consórcio',
      // 'Energia Solar',
      // 'Crefaz',
    ],
  },
  {
    texto: 'Você conhece o produto selecionado?',
    tipo: 'botoes',
    opcoes: ['Sim', 'Não'],
  },
];

const remetentes = {
  MAQUINA: 'maquina',
  USUARIO: 'usuario',
};

export default function Interaction() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mensagens, setMensagens] = useState([{ remetente: remetentes.MAQUINA, texto: 'Olá! Vamos começar?' }]);
  const [loading, setLoading] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [respostaInput, setRespostaInput] = useState('');
  const [exibirBotaoEnvio, setExibirBotaoEnvio] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    produto: '',
    duvida: '',
    profissao: '',
    origem: 'CHAT PRODUTOS'
  })

  const sendForm = async () => {
    try {
      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          produto: '',
          duvida: '',
          profissao: '',
          origem: 'CHAT PRODUTOS'
        });
      }
    } catch (error) {
      console.error('Erro ao realizar a solicitação:', error);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  const adicionarMensagemUsuario = (resposta) => {
    setMensagens([
      ...mensagens,
      { remetente: remetentes.MAQUINA, texto: perguntas[perguntaAtual].texto },
      { remetente: remetentes.USUARIO, texto: resposta },
    ]);
  };

  const responder = (resposta) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (perguntaAtual < perguntas.length) {
        const pergunta = perguntas[perguntaAtual];

        setFormData((prevFormData) => {
          let newData = { ...prevFormData };

          switch (pergunta.texto) {
            case 'Olá! Qual seu nome completo?':
              newData.nome = resposta;
              break;
            case 'Qual sua profissão?':
              newData.profissao = resposta;
              break;
            case 'Qual seu telefone?':
              newData.telefone = resposta;
              break;
            case 'Qual produto você gostaria de adquirir?':
              newData.produto = resposta;
              break;
            case 'Você conhece o produto selecionado?':
              newData.duvida = resposta === 'Sim' ? 'Eu já conheço o produto.' : 'Gostaria de saber mais sobre o produto.';
              break;
            default:
              break;
          }
          setDadosUsuario((prevDadosUsuario) => ({ ...prevDadosUsuario, ...newData }));

          return newData;
        });
      }

      adicionarMensagemUsuario(resposta);

      setRespostaInput('');
      setExibirBotaoEnvio(false);

      setPerguntaAtual((prevPergunta) => prevPergunta + 1);
    }, 1000);
  };

  const gerarTextoWhatsapp = () => {
    const textoFormatado = `Olá, meu nome é ${dadosUsuario.nome || 'Não informado'}, sou ${dadosUsuario.profissao || 'Não informado'} e tenho interesse em adquirir ${dadosUsuario.produto || 'Não informado'}. ${dadosUsuario.conhecimento === 'Sim' ? 'Eu já conheço o produto. Mas quero saber mais.' : 'Não conheço, mas gostaria de saber mais sobre o produto.'} Encontrei a Mais Valor atraves de um anuncio, e a paginá de auto contratação me convenceu a dar uma chance!`;

    return encodeURIComponent(textoFormatado);
  };


  return (
    <ChakraProvider>
      <VStack h={'100%'} css={`
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #fff;
          border-radius: 6px;
        }

        ::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0);
          border-radius: 6px;
        }
      `} overflowY={'scroll'} color={'black'} boxShadow={'md'} rounded={'2xl'} p={4} spacing={4} align="stretch" maxW="100%" mx="auto">
        {mensagens.map((mensagem, index) => (
          <Flex key={index} justify={mensagem.remetente === remetentes.MAQUINA ? 'flex-start' : 'flex-end'}>
            <Box color={mensagem.remetente === remetentes.MAQUINA ? 'white' : 'black'} p={4} bg={mensagem.remetente === remetentes.MAQUINA ? 'green' : 'gray.400'} borderRadius={mensagem.remetente === remetentes.MAQUINA ? '0 12px 12px 12px' : '12px 0 12px 12px'}>
              <Text display={'flex'} alignItems={'center'} gap={2} fontSize="lg" fontWeight={mensagem.remetente === remetentes.MAQUINA ? '#229544' : 'blue.500'}>
                <Box mt={-1.5} display={mensagem.remetente !== remetentes.MAQUINA && 'none'}><FaRobot fontSize={30} color='white' /></Box>
                {mensagem.remetente === remetentes.MAQUINA ? 'Mais Valor:' : ''}
              </Text>
              <Text fontSize="md"> {mensagem.texto}</Text>
            </Box>
          </Flex>
        ))}

        {loading && (
          <Flex justify="center">
            <Spinner size="lg" color="#229544" thickness="4px" />
          </Flex>
        )}

        {!loading && perguntaAtual < perguntas.length && (
          <Box p={4} boxShadow={'md'} borderRadius="md">
            <Text fontSize="lg">{perguntas[perguntaAtual].texto}</Text>

            {perguntas[perguntaAtual].tipo === 'input' && (
              <Flex gap={2}>
                <Input
                  variant='flushed'
                  _placeholder={{ color: "black" }}
                  placeholder={perguntas[perguntaAtual].placeholder}
                  value={respostaInput}
                  onChange={(e) => {
                    setRespostaInput(e.target.value);
                    setExibirBotaoEnvio(e.target.value.trim() !== '');
                  }}
                />
                {exibirBotaoEnvio && (
                  <Button color={'#fff'} onClick={() => responder(respostaInput)} bg="#229544">
                    Enviar
                  </Button>
                )}
              </Flex>
            )}

            {perguntas[perguntaAtual].tipo === 'numero' && (
              <Flex gap={2}>
                <Input
                  variant='flushed'
                  _placeholder={{ color: "black" }}
                  type='number'
                  placeholder={perguntas[perguntaAtual].placeholder}
                  value={respostaInput}
                  onChange={(e) => {
                    setRespostaInput(e.target.value);
                    setExibirBotaoEnvio(e.target.value.trim() !== '');
                  }}
                />
                {exibirBotaoEnvio && (
                  <Button color={'#fff'} onClick={() => responder(respostaInput)} bg="#229544">
                    Enviar
                  </Button>
                )}
              </Flex>
            )}

            {perguntas[perguntaAtual].tipo === 'select' && (
              <Select variant='flushed' onChange={(e) => responder(e.target.value)}>
                {perguntas[perguntaAtual].opcoes.map((opcao) => (
                  <option style={{ color: 'black' }} key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </Select>
            )}

            {perguntas[perguntaAtual].tipo === 'botoes' && (
              <Flex flexDir={'column'} w={'100%'} h={'100%'} gap={2}>
                {perguntas[perguntaAtual].opcoes.map((opcao) => (
                  <Button color={'#fff'} w={'100%'} key={opcao} onClick={() => responder(opcao)} bg="#229544">
                    {opcao}
                  </Button>
                ))}
              </Flex>
            )}
          </Box>
        )}

        {!loading && perguntaAtual === perguntas.length && (
          <Flex alignItems={'center'} justifyContent={'space-between'} p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg">Processo finalizado!</Text>
            <Button
              onClick={sendForm}
              as="a"
              href={`https://api.whatsapp.com/send?phone=+5511913675219&text=${gerarTextoWhatsapp()}`}
              target="_blank"
              rel="noopener noreferrer"
              bg="#229544"
              color={'#fff'}
            >
              Ir para o WhatsApp
            </Button>
          </Flex>
        )}
      </VStack>
    </ChakraProvider>
  );
}
