import { MenuItem } from 'primeng/api';

export const uiElements: {
  menuItems: {
    saveButton: MenuItemCreate;
    cancelButton: MenuItemCreate;
    createButton: MenuItemCreate;
    editButton: MenuItemCreate;
    closeButton: MenuItemCreate;
    deleteButton: MenuItemCreate;
  };
  icons: {
    edit: IconFactory;
    delete: IconFactory;
  };
} = {
  menuItems: {
    saveButton: (e) => ({
      label: 'Сохранить',
      icon: 'pi pi-save',
      iconStyle: {
        color: 'var(--primary-color)',
      },
      ...(e || {}),
    }),
    cancelButton: (e) => ({
      label: 'Отмена',
      icon: 'pi pi-times',
      iconStyle: {
        color: 'var(--red-500)',
      },
      ...(e || {}),
    }),
    closeButton: (e) => ({
      label: 'Закрыть',
      icon: 'pi pi-times',
      iconStyle: {
        color: 'var(--red-500)',
      },
      ...(e || {}),
    }),
    createButton: (e) => ({
      label: 'Создать',
      icon: 'pi pi-plus',
      iconStyle: {
        color: 'var(--primary-color)',
      },
      ...(e || {}),
    }),
    editButton: (e) => ({
      label: 'Редактировать',
      icon: 'pi pi-pencil',
      iconStyle: {
        color: 'var(--orange-500)',
      },
      ...(e || {}),
    }),
    deleteButton: (e) => ({
      label: 'Удалить',
      icon: 'pi pi-trash',
      iconStyle: {
        color: 'var(--red-500)',
      },
      ...(e || {}),
    }),
  },
  icons: {
    edit: (e) =>
      `<i class="pi pi-user-edit ${e?.iconClass || ''}" style="${
        e?.style || ''
      }"></i>`,
    delete: (e) =>
      `<i class="pi pi-trash ${e?.iconClass || ''}" style="${
        e?.style || ''
      }"></i>`,
  },
};

type MenuItemCreate = (e: Partial<MenuItem>) => MenuItem;

type IconFactory = (
  e?: Partial<{
    iconClass: string;
    style: string;
  }>
) => string;
