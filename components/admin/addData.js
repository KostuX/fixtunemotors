import { useDisclosure } from "@heroui/react"; // Import useDisclosure
import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Button , Modal, ModalContent, ModalHeader, ModalBody, Input, DatePicker, Textarea, ModalFooter, Accordion, AccordionItem  } from "@heroui/react";
export default function AddData({ onAddSuccess }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    reg: "",
    date: today(getLocalTimeZone()),
    job: "",
    description: "",
    carModel: "",
    mileage: 0,
    clientName: "",
    clientPhone: "",
    price: 0.0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);
        onOpenChange(false); // Close the modal after successful submission
        onAddSuccess(); // Trigger the parent component to refresh the table data
      } else {
        const result = await response.json();
        console.log("Failed to submit form:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Add New</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="REG"
                  name="reg"
                  placeholder="Enter Reg"
                  variant="bordered"
                  value={formData.reg}
                  onChange={handleInputChange}
                />
                <DatePicker
                  isRequired
                  value={formData.date}
                  onChange={handleDateChange}
                  className="p-2 rounded w-full"
                  aria-label="Date picker"
                />
                <Input
                  label="Car Model"
                  name="carModel"
                  placeholder=""
                  variant="bordered"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  aria-label="car model"
                />
                <Input
                  isRequired
                  label="Job"
                  name="job"
                  placeholder="Enter Job"
                  variant="bordered"
                  value={formData.job}
                  onChange={handleInputChange}
                  aria-label="job"
                />
                <Textarea
                  label="Description"
                  name="description"
                  placeholder="Enter job description"
                  value={formData.description}
                  onChange={handleInputChange}
                  aria-label="description"
                />
                <Accordion>
                  <AccordionItem key="1" aria-label="Additional data" title="Additional data">
                    <Input
                      label="Mileage"
                      name="mileage"
                      placeholder="0"
                      type="number"
                      variant="bordered"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      aria-label="mileage"
                    />
                    <Input
                      label="Client Name"
                      name="clientName"
                      placeholder=""
                      variant="bordered"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      aria-label="client name"
                    />
                    <Input
                      label="Phone"
                      name="clientPhone"
                      placeholder=""
                      variant="bordered"
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      aria-label="phone"
                    />
                    <Input
                      label="Price"
                      name="price"
                      placeholder="0.00"
                      type="number"
                      variant="bordered"
                      value={formData.price}
                      onChange={handleInputChange}
                      aria-label="price"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">€</span>
                        </div>
                      }
                    />
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="success" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}