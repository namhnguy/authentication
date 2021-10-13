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
                <Heading textAlign="center" fontSize="22" textColor="black" mb={50}>Please pick topics you are interested in!</Heading>
                <Checkbox mb={10} textColor="black" justifyContent="center">Personal Stories</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">Life Hacks</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">What to do/NOT to do</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">How-To Guides</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center">Before and After</Checkbox>
                <Button background="gray.900" textColor='white' onClick={() => { router.push("./microtags") } }>Continue</Button>
            </Flex>
        </Flex>
    )
}
