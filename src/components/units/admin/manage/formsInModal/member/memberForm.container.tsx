import { Modal } from 'antd';
import type { DatePickerProps } from 'antd';
import { useEffect, useState } from 'react';
import { IFormProps } from '../common/form.types';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  CREATE_MEMBER,
  INSERT_WORK_INFO,
  SEND_CODE_TO_EMAIL,
  SOFT_DELETE_MEMBER,
  UPDATE_MEMBER,
} from './memberForm.queries';
import {
  IMutation,
  IMutationCreateMemberArgs,
  IMutationInsertWorkInfoArgs,
  IMutationSendCodeToEmailArgs,
  IMutationSoftDeleteMemberArgs,
  IMutationUpdateMemberArgs,
} from '../../../../../../commons/types/generated/types';
import MemberFormpresenter from './memberForm.presenter';
import { IFormData } from './memberForm.types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().min(1).required(),
});

const MemberFormContainer = (props: IFormProps) => {
  const [createMember] = useMutation<
    Pick<IMutation, 'createMember'>,
    IMutationCreateMemberArgs
  >(CREATE_MEMBER);
  const [updateMember] = useMutation<
    Pick<IMutation, 'updateMember'>,
    IMutationUpdateMemberArgs
  >(UPDATE_MEMBER);
  const [softDeleteMember] = useMutation<
    Pick<IMutation, 'softDeleteMember'>,
    IMutationSoftDeleteMemberArgs
  >(SOFT_DELETE_MEMBER);
  const [sendCodeToEmail] = useMutation<
    Pick<IMutation, 'sendCodeToEmail'>,
    IMutationSendCodeToEmailArgs
  >(SEND_CODE_TO_EMAIL);
  const [insertWorkInfo] = useMutation<
    Pick<IMutation, 'insertWorkInfo'>,
    IMutationInsertWorkInfoArgs
  >(INSERT_WORK_INFO);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const [invitationRadio, setInvitationRadio] = useState([true, false, false]);
  const [isActiveStartDate, setIsActiveStartDate] = useState<boolean>(
    props.editTarget?.joinDate,
  );
  const [isActiveEndDate, setIsActiveEndDate] = useState<boolean>(
    props.editTarget?.exitDate,
  );
  const [isActiveWagesInput, setIsActiveWagesInput] = useState(false);

  useEffect(() => {
    if (props.editTarget) {
      reset(props.editTarget);
      if (props.editTarget.workInfo) {
        setIsActiveWagesInput(true);
        setValue('workInfoId', props.editTarget.workInfo.id);
      }
    }

    return () => {
      reset({});
    };
  }, [props.editTarget, reset, setValue]);

  const onChangeStartDate: DatePickerProps['onChange'] = (
    date: Dayjs | null,
  ) => {
    setValue('joinDate', new Date(String(date?.format('YYYY-MM-DD'))));
  };
  const onChangeEndDate: DatePickerProps['onChange'] = (date: Dayjs | null) => {
    setValue('exitDate', new Date(String(date?.format('YYYY-MM-DD'))));
  };
  const onChangeAppliedFrom: DatePickerProps['onChange'] = (
    date: Dayjs | null,
  ) => {
    setValue('appliedFrom', String(date?.format('YYYY-MM-DD')));
  };
  // const onChangeTransmissionDate: DatePickerProps['onChange'] = (
  //   date: Dayjs | null,
  // ) => {
  //   setValue('transmissionDate', new Date(String(date?.format('YYYY-MM-DD'))));
  // };

  const onChangeInvitation = (index: number) => () => {
    setInvitationRadio(invitationRadio.map((_, i) => index === i));
  };

  // const accessAuth = {
  //   id: props.editTarget?.accessAuth,
  //   name: props.editTarget?.accessAuth,
  // };

  const roleCategories = props.data?.roleCategories?.fetchRoleCategories?.map(
    (role) => ({
      id: String(role.id),
      name: String(role.name),
    }),
  );

  const organizations = props.data?.organizations?.fetchOrganizations?.map(
    (org) => ({
      id: String(org.id),
      name: String(org.name),
    }),
  );

  const workInfos = props.data?.workInfos?.fetchWorkInfos?.map((info) => ({
    id: String(info.id),
    name: String(info.name),
  }));

  const roleCategoryDefaultValue = props.editTarget?.roleCategory && [
    {
      id: String(props.editTarget?.roleCategory?.id),
      name: String(props.editTarget?.roleCategory?.name),
    },
  ];

  const organizationDefaultValue = props.editTarget?.organization && [
    {
      id: String(props.editTarget?.organization?.id),
      name: String(props.editTarget?.organization?.name),
    },
  ];

  const workInfoDefaultValue = props.editTarget?.workInfo?.id && [
    {
      id: String(props.editTarget?.workInfo?.id),
      name: String(props.editTarget?.workInfo?.name),
    },
  ];

  const defaultJoinDate = props.editTarget?.joinDate
    ? dayjs(props.editTarget?.joinDate, 'YYYY-MM-DD')
    : undefined;
  const defaultExitDate = props.editTarget?.exitDate
    ? dayjs(props.editTarget?.exitDate, 'YYYY-MM-DD')
    : undefined;
  const defaultAppliedFrom = props.editTarget?.appliedFrom
    ? dayjs(props.editTarget?.appliedFrom, 'YYYY-MM-DD')
    : undefined;

  const onSubmit = async (data: IFormData) => {
    try {
      const result = await createMember({
        variables: {
          createMemberInput: {
            name: String(data.name),
            exitDate: data.exitDate,
            joinDate: data.joinDate,
            memo: data.memo,
            organizationId: String(data.organizationId),
            roleCategoryId: String(data.roleCategoryId),
          },
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchMembers: (prev) => {
                return [data?.createMember, ...prev];
              },
            },
          });
        },
      });
      const invitationData = {
        email: data.email ?? '',
        memberId: String(result.data?.createMember.id),
      };
      await sendCodeToEmail({ variables: invitationData });
      await insertWorkInfo({
        variables: {
          memberId: result.data?.createMember.id ?? '',
          workInfoId: data.workInfoId ?? '',
          appliedFrom: data.appliedFrom ?? '',
        },
        update(cache) {
          cache.modify({
            fields: {
              fetchMembers: () => {},
            },
          });
        },
      });

      props.onCancel();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onEdit = async (data: any) => {
    const workInfoId =
      typeof data.workInfoId === 'string'
        ? data.workInfoId
        : data.workInfoId[0];
    try {
      await updateMember({
        variables: {
          memberId: props.editTarget?.id,
          updateMemberInput: {
            name: data.name,
            organizationId: data.organizationId[0],
            roleCategoryId: data.roleCategoryId[0],
            exitDate: data.exitDate,
            joinDate: data.joinDate,
            memo: data.memo,
          },
        },
      });
      await insertWorkInfo({
        variables: {
          memberId: props.editTarget?.id,
          appliedFrom: data.appliedFrom ?? '',
          workInfoId,
        },
        update(cache) {
          cache.modify({
            fields: {
              fetchMembers: () => {},
            },
          });
        },
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onSoftDelete = async () => {
    try {
      await softDeleteMember({
        variables: { memberId: props.editTarget?.id },
        update(cache) {
          cache.modify({
            fields: {
              fetchMembers: () => {},
            },
          });
        },
      });
      props.onCancel();
      Modal.success({
        content: `${String(props.editTarget?.name)} 님이 비활성화 되었습니다.`,
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <MemberFormpresenter
      editTarget={props.editTarget}
      isValid={isValid}
      roleCategories={roleCategories}
      roleCategoryDefaultValue={roleCategoryDefaultValue}
      organizations={organizations}
      organizationDefaultValue={organizationDefaultValue}
      workInfoDefaultValue={workInfoDefaultValue}
      setIsActiveStartDate={setIsActiveStartDate}
      isActiveStartDate={isActiveStartDate}
      defaultJoinDate={defaultJoinDate}
      isActvieWageInput={isActiveWagesInput}
      onChangeStartDate={onChangeStartDate}
      setIsActiveEndDate={setIsActiveEndDate}
      isActiveEndDate={isActiveEndDate}
      defaultExitDate={defaultExitDate}
      defaultAppliedFrom={defaultAppliedFrom}
      onChangeEndDate={onChangeEndDate}
      onChangeInvitation={onChangeInvitation}
      invitationRadio={invitationRadio}
      onChangeAppliedFrom={onChangeAppliedFrom}
      setIsActiveWagesInput={setIsActiveWagesInput}
      workInfos={workInfos}
      onSoftDelete={onSoftDelete}
      onCancel={props.onCancel}
      isActiveWagesInput={isActiveWagesInput}
      onEdit={onEdit}
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      setValue={setValue}
    />
  );
};

export default MemberFormContainer;
