import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

const StyledToggle = styled.div`
    margin-bottom: 60px;
    @media only screen and (max-width: 800px) {
        text-align: center;
    }
`;

const theme = createTheme({
    palette: {
      primary: {
        main: '#8493D3',
      },
    },
  });

export type AllowedSelection = 'table' | 'single' | 'queue';

type Props = {
    component: string;
    setComponent: React.Dispatch<React.SetStateAction<AllowedSelection>>;
}


export const ToggleComponent = ({ component, setComponent }: Props) => {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newSelection: AllowedSelection
    ) => {
        // only trigger changes if the user selects a different toggle
        if (newSelection !== null) {
            history.replaceState(undefined, '', `#${newSelection}`);
            setComponent(newSelection);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledToggle>
                <h4>Select a Trigger datatype to view its API</h4>
                <ToggleButtonGroup
                    color="primary"
                    value={component}
                    exclusive
                    onChange={handleChange}
                    aria-label="Component API to view"
                    size="large"
                >
                    <ToggleButton value="table" sx={{ fontSize: '0.8em' }}>Table</ToggleButton>
                    <ToggleButton value="single" sx={{ fontSize: '0.8em' }}>Single</ToggleButton>
                    <ToggleButton value="queue" sx={{ fontSize: '0.8em' }}>Queue</ToggleButton>
                </ToggleButtonGroup>
            </StyledToggle>
        </ThemeProvider>
    );
};