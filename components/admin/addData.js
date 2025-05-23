import { useDisclosure } from "@heroui/react"; // Import useDisclosure
import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Button , Modal, ModalContent, ModalHeader, ModalBody, Input, DatePicker, Textarea, ModalFooter, Accordion, AccordionItem  } from "@heroui/react";
export default function AddData({ user, setTableData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errrorMessage, setErrorMessage] = useState([]);

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
    console.log(formData)
    try {
      const response = await fetch("/api/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Fetch the updated data from the database
        const fetchResponse = await fetch("/api/getCarHistory");
        if (!fetchResponse.ok) {
          throw new Error("Failed to fetch updated data");
        }
        const updatedData = await fetchResponse.json();
  
        // Update the table data with the fetched data
        setTableData(updatedData);
  
        onOpenChange(false); // Close the modal after successful submission
      } else {
        const result = await response.json();
        console.log("Failed to submit form:", result);
        setErrorMessage(result.errors || ["Failed to submit form"]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Button 
      isDisabled={!user.write}
      color="success" onPress={onOpen} className="text-white w-1/3 " size="sm" >
      Add New
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
              <ModalHeader className="flex flex-col gap-1 text-center">ADD NEW</ModalHeader>
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
                {errrorMessage.length > 0 && (
                  <div className="text-red-500 text-sm mt-2">
                    {errrorMessage.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
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