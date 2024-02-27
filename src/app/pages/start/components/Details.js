import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"

export default function Details() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <Button mb={250} w={{ base: '50%', md: '10%' }} zIndex={9} ml={{ base: 0, md: 2 }} mt={{ base: 2, md: 20 }} colorScheme='whatsapp' onClick={onOpen}>
        Mais detalhes
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Mais detalhes sobre: FGTS
            </AlertDialogHeader>

            <AlertDialogBody>
              <Heading color={'#229544'} size={'md'} mb={10}>
                O que é a antecipação do Saque-Aniversário FGTS?
              </Heading>
              <Text fontWeight={'semibold'} mt={2}>
                ⦁	Uma modalidade de crédito destinada a pessoas físicas que optarem pelo Saque-Aniversário do FGTS.
              </Text>
              <Text fontWeight={'semibold'} mt={2}>
                ⦁	Você pode antecipar até 10 anos do Saque-Aniversário, sem comprometer sua renda mensal.
              </Text>
              <Text fontWeight={'semibold'} mt={2}>
                ⦁	O mínimo é de R$ 200,00 e não há limite máximo para o saque.
              </Text>
              <Text fontWeight={'semibold'} mt={2}>
                ⦁	Liberado para negativados com saldo no FGTS, mesmo em contas inativas.
              </Text>
              <Text fontWeight={'semibold'} mt={2}>
                ⦁	Débito anual diretamente do saldo do FGTS, sem descontar parcelas mensais.
              </Text>



            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                FECHAR
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}