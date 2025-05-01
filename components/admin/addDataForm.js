import { useState } from "react";
import {
  Button,
  Input,
  DatePicker,
  Textarea,
  Accordion,
  AccordionItem,
  Form,
  addToast,
  ToastProvider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
 
  useDisclosure,
} from "@heroui/react";

import { today, getLocalTimeZone } from "@internationalized/date";

export default function AddDataForm({ user, setTableData }) {
  const [errorMessage, setErrorMessage] = useState([]);
  const [open, setOpen] = useState(false);
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
    console.log(formData);
    try {
      const response = await fetch("/api/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");

        setOpen(true);
        /*
        // Fetch the updated data from the database
        const fetchResponse = await fetch("/api/getCarHistory");
        if (!fetchResponse.ok) {
          throw new Error("Failed to fetch updated data");
        }
        const updatedData = await fetchResponse.json();

        // Update the table data with the fetched data
        setTableData(updatedData);
*/
        // Reset the form
        setFormData({
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
        setErrorMessage([]);
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
    <Form onSubmit={handleSubmit} className=" rounded shadow-md  ">
     
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
        isRequired
        label="Job"
        name="job"
        placeholder="Enter Job"
        variant="bordered"
        value={formData.job}
        onChange={handleInputChange}
        aria-label="job"
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
     
      <Textarea
        label="Description"
        name="description"
        placeholder="Enter job description"
        value={formData.description}
        onChange={handleInputChange}
        aria-label="description"
      />
      {errorMessage.length > 0 && (
        <div className="text-red-500 text-sm mt-2">
          {errorMessage.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
   
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

      <div className="flex w-full items-center justify-end gap-2 mt-4">
        <Button color="danger" variant="flat" type="reset">
          Reset
        </Button>
        <Button color="success" type="submit" className=" items-center flex w-56">
          Add
        </Button>
      </div>
    </Form>
   <Modal isOpen={open}>
   <ModalContent>
     {(open) => (
       <>
         <ModalHeader className="flex flex-col gap-1 text-green-500"> {formData.reg} Added successfully</ModalHeader>
         <ModalBody>
         
         </ModalBody>
         <ModalFooter>
           
           <Button color="success" size="sm" onPress={()=>{setOpen(false)}}>
             ok
           </Button>
         </ModalFooter>
       </>
     )}
   </ModalContent>
 </Modal></>
  );
}