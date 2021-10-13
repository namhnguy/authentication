import React from "react"
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useRouter } from "next/router"


export default function resetSuccess() {
    const router = useRouter()
    return (
        <><Flex height="70vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={6} rounded={6}>
                <Heading textAlign="center" textColor="gray.900" fontSize="52" mb={4}>Account Successfully Created!</Heading>
                
            </Flex>
        </Flex>
        <Flex height="0vh" alignItems="center" justifyContent="center">
            <Flex direction="column">
                
                <Button size="lg" onClick={() => { router.push("./macrotags") } } mb={6} background="gray.900" textColor='white'>Continue</Button>
            </Flex>
        </Flex></>
    )
}
