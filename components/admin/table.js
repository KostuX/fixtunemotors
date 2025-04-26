import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";

export default function CarTable({ tableData }) {
  const [filter, setFilter] = useState(""); // Single input for filtering all fields
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 20; // Number of items per page

  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row data

  // Filtered data based on the single filter input
  const filteredTableData = tableData.filter((row) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      row.name.toLowerCase().includes(lowerCaseFilter) ||
      row.role.toLowerCase().includes(lowerCaseFilter) ||
      row.label.toLowerCase().includes(lowerCaseFilter)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredTableData.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle row click
  const handleRowClick = (row) => {
    setSelectedRow(row); // Set the selected row data
    onOpen(); // Open the modal
  };

  return (
    <div className="mx-1 sm:mx-12">
      <div className="mb-4 flex gap-4 justify-center">
        <Input
          type="text"
          placeholder="Filter by any field"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded w-1/2"
        />
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>REG</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>JOB</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index} onClick={() => handleRowClick(row)} className="cursor-pointer">
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="p-2 rounded "
          size="sm"
        >
          {"<"}
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="p-2 rounded "
          size="sm"
        >
          {">"}
        </Button>
      </div>

      {/* Modal for displaying row data */}
      <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Row Details</ModalHeader>
              <ModalBody>
                {selectedRow && (
                  <div>
                    <p><strong>REG:</strong> {selectedRow.name}</p>
                    <p><strong>DATE:</strong> {selectedRow.role}</p>
                    <p><strong>JOB:</strong> {selectedRow.label}</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}