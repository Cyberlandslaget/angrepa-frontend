import React, { useMemo } from 'react';
import { ExecutionType, FlagType, LoggingDisplayProps } from '../utils/types';
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
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const executionsDataParser = (data: ExecutionType) => {
  return (
    <div
      className={`log Color grid gap-1 w-full h-full brightness-90 [grid-template-columns:1fr_9.25rem] items-center text-center text-sm ${
        data.exit_code === 0 ? 'success' : 'error'
      }`}
    >
      <div className="flex gap-1 text-left truncate" title={data.output}>
        <span className="px-2 rounded-sm secondaryColor" title="Execution ID">
          {data.id}
        </span>
        <span className="px-2 rounded-sm secondaryColor" title="Tick">
          {data.target_tick}
        </span>
        <p className="truncate [color:var(--logBackgroundColor)]">
          {data.output}
        </p>
      </div>
      <div className="grid [grid-template-columns:5.5rem_1fr] gap-1 pl-1">
        <span
          className="w-full rounded-sm truncate [background-color:var(--logBackgroundColor)] [color:var(--logColor)]"
          title={'Service'}
        >
          {data.service}
        </span>
        <span
          className="w-full px-1 rounded-sm [background-color:var(--logBackgroundColor)] [color:var(--logColor)]"
          title={'Execution time'}
        >
          {(new Date(data.finished_at).getTime() -
            new Date(data.started_at).getTime()) /
            1000}
          s
        </span>
      </div>
    </div>
  );
};
const flagSubmissionDataParser = (data: FlagType, censor: boolean) => {
  return (
    <div
      className={`log grid gap-1 w-full h-full brightness-90 [grid-template-columns:3.25rem_2rem_4.75rem_5.5rem_1fr_3rem] items-center text-center text-sm ${
        data?.status ?? ''
      }`}
    >
      <span
        className="secondaryColor rounded-sm py-[0.1rem]"
        title="Execution ID"
      >
        {data.execution_id}
      </span>
      <span
        className="secondaryColor rounded-sm py-[0.1rem]"
        title="Exploit ID"
      >
        {data.exploit_id}
      </span>
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="Team">
        {data.team ?? '?'}
      </span>
      <span className="secondaryColor rounded-sm py-[0.1rem]" title="Service">
        {data.service ?? '?'}
      </span>
      <p className="text-left text-ellipsis whitespace-nowrap overflow-hidden pl-1 [color:var(--logBackgroundColor)]">
        {censor
          ? (data.text?.substring(0, data.text?.length - 8) || '') +
            'x'.repeat(8)
          : data.text}
      </p>
      <span
        className="rounded-sm [background-color:var(--logBackgroundColor)] [color:var(--logColor)]"
        title="status code"
      >
        {data?.status ?? '?'}
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
  const [statusFilter, setStatusFilter] = React.useState<string[]>(filters);

  const filterData = useMemo(() => {
    return (
      data?.filter((d: unknown) =>
        statusFilter.includes(String(d.status) || String(d.exit_code))
      ) ?? []
    );
  }, [data]);

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

      <div className="w-full h-[calc(100%-1rem)]">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={filterData.length}
              itemSize={28}
              width={width}
            >
              {({ index, style }) => (
                <div style={{ ...style }}>
                  {parser === 'submission'
                    ? flagSubmissionDataParser(
                        filterData[filterData.length - 1 - index],
                        sensor
                      )
                    : executionsDataParser(
                        filterData[filterData.length - 1 - index]
                      )}
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </>
  );
};
export default LoggingDisplay;
