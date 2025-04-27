import AddData from "./addData";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from "@heroui/react";

export default function CarTable() {
  const [tableData, setTableData] = useState([]); // State for table data
  const [filter, setFilter] = useState(""); // Single input for filtering all fields
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row data
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const itemsPerPage = 20; // Number of items per page

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("/api/getCarHistory");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTableData(data); // Set the fetched data to the table
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Filtered data based on the single filter input
  const filteredTableData = tableData.filter((row) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      row?.reg?.toLowerCase().includes(lowerCaseFilter) ||
      row?.date?.toLowerCase().includes(lowerCaseFilter) ||
      row?.job?.toLowerCase().includes(lowerCaseFilter)
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
    setIsModalOpen(true); // Open the modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedRow(null); // Clear the selected row data
  };

  // Handle edit
  const handleEdit = (rowData) => {
    console.log("Editing row:", rowData);
    // Add your logic to handle editing the row data here





  };

  return (
    <div className="mx-1 sm:mx-12">
      <div className="mb-4 flex gap-4 justify-center">
        <Input
          type="text"
          placeholder="Filter"
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
            <TableRow
              key={index}
              onClick={() => handleRowClick(row)} // Open modal on row click
              className="cursor-pointer"
            >
              <TableCell className="text-md">{row.reg}<div className="text-sm">{row.carmodel}</div></TableCell>
              <TableCell className="text-md">{row.date}</TableCell>
              <TableCell className="text-md">{row.job}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          disabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
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
          onPress={() => handlePageChange(currentPage + 1)}
          className="p-2 rounded "
          size="sm"
        >
          {">"}
        </Button>
      </div>

      {/* Modal for displaying row data */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal} backdrop="blur">
          <ModalContent>
            <ModalHeader className="text-center font-bold underline">Details</ModalHeader>
            <ModalBody>
              {selectedRow && (
                <div>
                  <p><strong>REG:</strong> {selectedRow.reg}</p>
                  <p><strong>DATE:</strong> {selectedRow.date}</p>
                  <p><strong>JOB:</strong> {selectedRow.job}</p>
                  {selectedRow.carmodel && <p><strong>Car Model:</strong> {selectedRow.carmodel}</p>}
                  {selectedRow.description && <p><strong>Description:</strong> {selectedRow.description}</p>}
                  <Divider className="my-4" />
                  {selectedRow.mileage > 0 && <p><strong>Mileage:</strong> {selectedRow.mileage}</p>}
                  {selectedRow.clientname && <p><strong>Client Name:</strong> {selectedRow.clientname}</p>}
                  {selectedRow.phone && <p><strong>Phone:</strong> {selectedRow.phone}</p>}
                  {selectedRow.price > 0 && <p><strong>Price:</strong> {selectedRow.price}€</p>}
                  {selectedRow.id && <p className="text-xs"><strong>ID:</strong> {selectedRow.id}</p>}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
              isDisabled
                size="sm"
                color="warning"
                onPress={() => handleEdit(selectedRow)} // Pass selectedRow to handleEdit
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onPress={handleCloseModal}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
          
        </Modal>
      )}
    </div>
  );
}