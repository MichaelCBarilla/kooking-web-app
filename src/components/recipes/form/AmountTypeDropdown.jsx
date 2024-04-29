import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

const AmountTypeDropdown = ({ onSelect }) => {
  const units = [
    { id: 1, fullName: "Teaspoon", abbreviation: "tsp" },
    { id: 2, fullName: "Tablespoon", abbreviation: "tbsp" },
    { id: 3, fullName: "Cup", abbreviation: "c" },
    { id: 4, fullName: "Fluid ounce", abbreviation: "fl oz" },
    { id: 5, fullName: "Pint", abbreviation: "pt" },
    { id: 6, fullName: "Quart", abbreviation: "qt" },
    { id: 7, fullName: "Gallon", abbreviation: "gal" },
    { id: 8, fullName: "Milliliter", abbreviation: "ml" },
    { id: 9, fullName: "Liter", abbreviation: "l" },
    { id: 10, fullName: "Gram", abbreviation: "g" },
    { id: 11, fullName: "Kilogram", abbreviation: "kg" },
    { id: 12, fullName: "Ounce", abbreviation: "oz" },
    { id: 13, fullName: "Pound", abbreviation: "lb" }
  ];

  return (
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Cooking Unit
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {units.map((unit) => (
          <Dropdown.Item key={unit.id} eventKey={unit.fullName}>
            {unit.fullName} ({unit.abbreviation})
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

AmountTypeDropdown.propTypes = {
  onSelect: PropTypes.array.isRequired,
};

export default AmountTypeDropdown;
