import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";
function AlertConfirm({ isAlertOpen, onAlertClose }) {
    const closeRef = useRef();
    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={closeRef}
                onClose={onAlertClose}
                isOpen={isAlertOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your notes? 44
                        words will be deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={closeRef} onClick={onAlertClose}>
                            No
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default AlertConfirm;
