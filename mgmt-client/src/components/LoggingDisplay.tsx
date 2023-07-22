import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import { DataType, LoggingDisplayProps } from '../utils/types';
import { useAtomValue } from 'jotai';
import { sensorFlagAtom } from 'utils/atoms';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FLAG_STATUS } from 'utils/constants';

const exploitDataParser = (data: DataType) => {
  return (
    <div
      className={`log grid gap-1 w-full h-full brightness-90 [grid-template-columns:1fr_4rem] items-center text-center text-sm ${
        data.status ?? 'info'
      }`}
      title={data.content}
    >
      <p className="text-left text-ellipsis whitespace-nowrap overflow-hidden pl-1 [color:var(--logBackgroundColor)]">
        {data.content}
      </p>
      <span className="rounded-sm [background-color:var(--logBackgroundColor)] [color:var(--logColor)]">
        {data.status ?? 'info'}
      </span>
    </div>
  );
};
const flagSubmissionDataParser = (data: DataType, sensor: boolean) => {
  return (
    <div
      className={`log grid gap-1 w-full h-full brightness-90 [grid-template-columns:2.25rem_2.25rem_8rem_1fr_3rem] items-center text-center text-sm ${
        FLAG_STATUS[data?.status ?? 'Error'] ?? ''
      }`}
    >
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="tick">
        {data.tick || '?'}
      </span>
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="team">
        {Math.floor(data.team || 0)}
      </span>
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="service">
        {data.flagstore || '???'}
      </span>
      <p className="text-left text-ellipsis whitespace-nowrap overflow-hidden pl-1 [color:var(--logBackgroundColor)]">
        {sensor
          ? (data.flag?.substring(0, data.flag?.length - 8) || '') +
            'x'.repeat(8)
          : data.flag}
      </p>
      <span
        className="rounded-sm [background-color:var(--logBackgroundColor)] [color:var(--logColor)]"
        title="status code"
      >
        {FLAG_STATUS[data?.status ?? 'Error']}
      </span>
    </div>
  );
};

const LoggingDisplay = ({
  data,
  parser,
  extended,
  filters,
}: LoggingDisplayProps) => {
  // The scrollable element for your list
  const parentRef = React.useRef(null);
  const [statusFilter, setStatusFilter] = React.useState<string[]>(filters);

  const filterData = data.filter((d) =>
    statusFilter.includes(String(d.status))
  );

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filterData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
  });
  const sensor = useAtomValue(sensorFlagAtom);

  const handleChange = (event: SelectChangeEvent<typeof statusFilter>) => {
    const {
      target: { value },
    } = event;
    if (value[value.length - 1] === 'all') {
      setStatusFilter(statusFilter.length === filters.length ? [] : filters);
      return;
    }
    setStatusFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      {extended && (
        <div className="flex justify-end">
          <FormControl
            sx={{
              m: 1,
              width: 300,
            }}
          >
            <InputLabel sx={{ color: 'white' }}>Filter</InputLabel>
            <Select
              multiple
              value={statusFilter}
              onChange={handleChange}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: 'var(--secondary)',
                    },
                  },
                },
              }}
              input={
                <OutlinedInput
                  label="Filter"
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover > .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                />
              }
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              <MenuItem
                value="all"
                sx={{
                  color: 'white',
                  svg: { filter: 'invert(1)' },
                  '.Mui-checked svg': { filter: 'invert(0)' },
                  '.MuiCheckbox-indeterminate svg': { filter: 'invert(0)' },
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      filters.length > 0 &&
                      filters.length === statusFilter.length
                    }
                    indeterminate={
                      statusFilter.length > 0 &&
                      statusFilter.length < filters.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Select All" />
              </MenuItem>
              {filters.map((filter) => (
                <MenuItem
                  key={filter}
                  value={filter}
                  sx={{
                    color: 'white',
                    svg: { filter: 'invert(1)' },
                    '.Mui-checked svg': { filter: 'invert(0)' },
                  }}
                >
                  <Checkbox checked={statusFilter.indexOf(filter) > -1} />
                  <ListItemText primary={filter} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {/* The scrollable element for your list */}
      <div ref={parentRef}>
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {parser === 'submission'
                ? flagSubmissionDataParser(
                    filterData[filterData.length - 1 - virtualItem.index],
                    sensor
                  )
                : exploitDataParser(
                    filterData[filterData.length - 1 - virtualItem.index]
                  )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default LoggingDisplay;
