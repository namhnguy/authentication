import React from "react"
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useRouter } from "next/router"
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"

export default function macrotags() {
    const router = useRouter()
    return (
        <Flex height="90vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={6} rounded={6}>
                <Heading textAlign="center" fontSize="22" textColor="black" mb={50}>What would you like to learn about?</Heading>
                <Checkbox mb={10} textColor="black" justifyContent="center">Diabetes</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">Heart Disease</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">Cancer</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">Acute Liver Failure</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">Multiple Sclerosis</Checkbox>
                <Button background="gray.900" textColor='white' onClick={() => { router.push("./landingpage") } }>Done</Button>
            </Flex>
        </Flex>
    )
}
