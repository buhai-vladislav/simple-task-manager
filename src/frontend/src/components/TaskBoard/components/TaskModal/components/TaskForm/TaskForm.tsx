import { Input } from 'antd';
import { InputWrapper } from '../../../../../shared/InputWrapper';
import TextArea from 'antd/es/input/TextArea';
import { FC } from 'react';
import { ITaskFormProps } from './TaskForm.props';

export const TaskForm: FC<ITaskFormProps> = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <InputWrapper error={formik.errors.title}>
        <Input
          name="title"
          placeholder="Type task name"
          value={formik.values.title}
          onChange={formik.handleChange}
          status={formik.errors.title ? 'error' : undefined}
        />
      </InputWrapper>
      <TextArea
        rows={4}
        placeholder="Type task description"
        value={formik.values.description}
        name="description"
        onChange={formik.handleChange}
      />
    </form>
  );
};
