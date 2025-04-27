import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  Textarea,
  DatePicker,
} from "@heroui/react";

export default function EditHistoryEntry({ data, onClose, setTableData }) {
  const [isModalOpen, setIsModalOpen] = useState(true); // State for modal visibility
  const [selectedRow, setSelectedRow] = useState(data); // State for selected row data
const [errors, setErrors] = useState([]); // State for error messages
  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedRow(null); // Clear the selected row data
    onClose(); // Call the parent-provided onClose method
  };

  // Handle form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
   
    try {
        const response = await fetch("/api/updateCarHistory", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedRow),
        });
    
        if (response.ok) {
          const updatedData = await response.json();
          console.log("Record updated successfully:", updatedData);
          handleCloseModal()
          // Update the table data here
        } else {
          const result = await response.json();
          console.error("Failed to update record:", result.errors || result.error);
        }
      } catch (error) {
        console.error("Error updating record:", error);
      }
  };
  

  return (
    <div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal} backdrop="blur">
          <ModalContent>
            <ModalHeader className="text-center font-bold underline">
              {selectedRow ? "Edit Details" : "Details"}
            </ModalHeader>
            <ModalBody>
              {selectedRow && (
                <form onSubmit={handleEditSubmit}>
                  <Input
                    isRequired
                    label="REG"
                    value={selectedRow.reg}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, reg: e.target.value })
                    }
                  />
                    
                  <Input
                    label="Car Model"
                    value={selectedRow.carmodel}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, carmodel: e.target.value })
                    }
                  />
                  <Input
                    isRequired
                    label="Job"
                    value={selectedRow.job}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, job: e.target.value })
                    }
                  />
                  <Textarea
                    label="Description"
                    value={selectedRow.description}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, description: e.target.value })
                    }
                  />
                  {errors.length > 0 && (
                    <div className="text-red-500 mt-2">
                      {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                  <Divider className="my-4" />
                  <Input
                    label="Mileage"
                    type="number"
                    value={selectedRow.mileage}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, mileage: e.target.value })
                    }
                  />
                  <Input
                    label="Client Name"
                    value={selectedRow.clientname}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, clientname: e.target.value })
                    }
                  />
                  <Input
                    label="Phone"
                    value={selectedRow.phone}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, phone: e.target.value })
                    }
                  />
                  <Input
                    label="Price"
                    type="number"
                    value={selectedRow.price}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, price: e.target.value })
                    }
                  />
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button color="success" type="submit">
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}