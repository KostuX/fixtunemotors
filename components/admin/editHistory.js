export default function EditHistoryEntry(data){



    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [selectedRow, setSelectedRow] = useState(null); // State for selected row data
    
    const handleEditClick = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };
    
    return (
        <div>
        <button onClick={() => handleEditClick(data)}>Edit</button>
        {isModalOpen && (
            <Modal open={isModalOpen} onClose={handleCloseModal}>
            <ModalContent>
                <ModalHeader>Edit Entry</ModalHeader>
                <ModalBody>
                {/* Add your form fields here to edit the entry */}
                <p>Editing entry for: {selectedRow?.reg}</p>
                </ModalBody>
                <ModalFooter>
                <button onClick={handleCloseModal}>Close</button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        )}
        </div>
    );
}