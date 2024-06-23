import React from 'react';
import { Navbar, Form, FormControl, Button, Container, OverlayTrigger, Tooltip, DropdownButton, Dropdown } from 'react-bootstrap';
const units = ["SECONDS", "MINUTES", "HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"];
const NewsNavbar = ({ searchQuery, setSearchQuery,interval,setInterval,unit,setUnit,isOffline,setIsOffline, handleSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery,interval,unit,isOffline);
    };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">NEWS Search App</Navbar.Brand>
        <Form className="d-flex" onSubmit={handleSubmit} style={{paddingTop:'10px'}}>
          <FormControl
            type="search"
            placeholder="Keyword"
            className="me-2"
            aria-label="Keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FormControl
            type="search"
            placeholder="Interval"
            className="me-2"
            aria-label="Interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />

          <DropdownButton
            variant="outline-secondary"
            title={unit}
            id="input-group-dropdown-1"
            className="me-2"
          >
            {units.map((unitOption) => (
              <Dropdown.Item key={unitOption} onClick={() => setUnit(unitOption)}>
                {unitOption}
              </Dropdown.Item>
            ))}
          </DropdownButton>
         
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-bottom">Toggle Offline Mode</Tooltip>}
        >
          <div className="form-check form-switch ms-3" style={ {paddingTop : '10px'}}       
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="offlineModeSwitch"
              checked={isOffline}
              onChange={(e) => setIsOffline(e.target.checked)}
              
            />
          </div>
        </OverlayTrigger>
        <Button variant="outline-success" type="submit" style={{marginLeft:'5px'}}>Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NewsNavbar;
