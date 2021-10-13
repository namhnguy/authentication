import React from 'react'
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { Box } from "@chakra-ui/react"

export default function StartPage() {
    
    const router = useRouter()

    return (
        <><Box bg="pink" textColor="black" fontSize="32" textAlign="center" w="100%" p={4} color="black">
            HealthTok
        </Box><>
       
        <Flex height="91vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={12} rounded={6}>
                <Button onClick={() => { router.push("./signIn") } } mb={6} background="gray.900" textColor='white'>Login</Button>
                <Button onClick={() => { router.push("./landingpage") } }  background="gray.900" textColor='white'>Continue Without Login</Button>
            </Flex>
        </Flex></></>     
    )
}
