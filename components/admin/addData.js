import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  DatePicker,
  Accordion,
  AccordionItem,
  Textarea,
} from "@heroui/react";

export default function AddData() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="success" onPress={onOpen} className="text-white">
        Create New
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New</ModalHeader>
              <ModalBody>
                <Input label="REG" placeholder="Enter Reg" variant="bordered" />
                <DatePicker
                  key="Inside"
                  className=""
                  label={"Date"}
                  labelPlacement="inside"
                />
                <Input label="Job" placeholder="Enter Job" variant="bordered" />
                <Textarea
                  className=""
                  label="Description"
                  placeholder="Enter your description"
                />

                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Additional data"
                    title="Additional data"
                  >
                    <Input
                      label="Car Model"
                      placeholder="Enter Car Model"
                      variant="bordered"
                    />
                    <Input
                      label="Milage"
                      placeholder="Enter Milage"
                      variant="bordered"
                    />
                    <Input
                      label="Client Name"
                      placeholder="Enter Client Name"
                      variant="bordered"
                    />
                    <Input
                      label="Client Phone"
                      placeholder="Enter Client Phone"
                      variant="bordered"
                    />
                    <Input
                      label="Price"
                      placeholder="Price"
                      variant="bordered"
                    />
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="success" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
