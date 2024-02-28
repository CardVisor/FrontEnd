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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import AdminDetailWeeklyTraffic from "./AdminDetailWeeklyTraffic";

export default function AdminWeeklyTranSactionModal() {
  const iconColor = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={SearchIcon} color={iconColor} me="4px" mb="4px" />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent maxH="900px" maxW="1000px">
          <ModalHeader>12주간 주간 결제건수</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminDetailWeeklyTraffic />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
