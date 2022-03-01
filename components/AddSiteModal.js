import { useRef } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { useAuth } from '../lib/auth'
import { createSite } from '../lib/db'

export default function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef()

  const toast = useToast()

  const { user } = useAuth()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const onCreateSite = ({ site, url }) => {
    createSite({
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      site,
      url
    })
    toast({
      title: 'Side added.',
      description: "We've added the site to your account.",
      status: 'success',
      duration: 2500,
      isClosable: true
    })
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Add Site</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.site}>
              <FormLabel>Site</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My site"
                {...register('site', {
                  required: 'This field is required'
                })}
              />
              {errors.site && (
                <FormErrorMessage>{errors.site.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.url}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://www.website.com"
                {...register('url', {
                  required: 'This field is required',
                  pattern: {
                    value:
                      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                    message: 'Invalid url'
                  }
                })}
              />
              {errors.url && (
                <FormErrorMessage>{errors.url.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
