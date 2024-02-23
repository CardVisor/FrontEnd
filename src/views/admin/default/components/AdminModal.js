import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Lorem } from "react-lorem-generator";
import AdminDetailMonthTotalSpent from "./AdminDetailMonthTotalSpent";

export default function AdminModal() {
  const iconColor = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={SearchIcon} color={iconColor} me="4px" mb="4px" />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent maxH="900px" maxW="1000px">
          <ModalHeader>1년간 월 결제내역</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminDetailMonthTotalSpent />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
