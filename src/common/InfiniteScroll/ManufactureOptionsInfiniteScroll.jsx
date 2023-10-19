import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import { styled } from '@mui/material/styles'
import {
    FormControl,
    FormHelperText,
    FormLabel,
    Typography,
} from "@mui/joy";

const StyledAutocomplete = styled(MuiAutocomplete)(({ theme }) => ({
    ".MuiAutocomplete-input": {
        marginTop: '-3px'
    }
}))


const StyledTextInput = styled(TextField)(({ theme }) => ({
    ".MuiOutlinedInput-root": {
        height: 35,
        borderRadius: 0,
        fontFamily: "Noto Sans",
        "&:hover": {
            outline: "none",
            borderColor: "red"
        }
    }
}));

export default function ManufactureOptionsInfiniteScroll({ readOnly, searchValue, onChange, touched, error, fetchNextPage, data, label, setSearch, selectedOptions }) {
    const loadMoreResults = () => {
        fetchNextPage()
    };
    const handleChange = (_event, newValue) => {
        onChange(newValue)
    }
    const handleScroll = (event) => {
        const listboxNode = event.currentTarget;
        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        if (listboxNode.scrollHeight - position <= 1) {
            loadMoreResults();
        }
    };

    return (
        <FormControl size="sm" >
            <FormLabel sx={{ fontFamily: 'Noto Sans', fontSize: '.9rem' }}>
                {label} &nbsp; <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <StyledAutocomplete
                readOnly={readOnly}
                size="small"
                onChange={handleChange}
                options={data ? data : []}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                    <Box
                        key={option._id}
                        sx={{ fontFamily: "Noto Sans" }}
                        component="li"
                        {...props}
                    >
                        {option.label}
                    </Box>
                )
                }
                renderInput={(params) => (
                    < StyledTextInput
                        value={searchValue}
                        onChange={(e) => setSearch(e.target.value)}
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "off"
                        }}
                    />
                )}
                ListboxProps={{
                    onScroll: handleScroll
                }}
            />{touched && error && (
                < FormHelperText sx={{ color: "red", fontSize: '.6rem' }}>
                    {error}
                </FormHelperText >
            )}
        </FormControl >
    );
}

