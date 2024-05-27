import { colorGuide, AppColors, AppFonts } from './styleGuide';

export const title = {
  fontFamily: AppFonts.markazi,
  fontSize: 50,
  color: AppColors.lime,
};

export const subtitle = {
  fontFamily: AppFonts.markazi,
  fontSize: 30,
  color: AppColors.white,
};

export const leadText = {
  fontFamily: AppFonts.karla,
  fontSize: 18,
  color: AppColors.white,
};

export const sectionTitle = {
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: AppColors.darkGrey,
};

export const blockTitle = {
  fontWeight: 'bold',
  fontSize: 16,
  color: AppColors.darkGrey,
};

export const paragraph = {
  fontSize: 14,
  color: AppColors.darkGreen,
};

export const inputContainer = {
  borderWidth: 1,
  borderColor: colorGuide.input.border,
  color: colorGuide.input.text,
  borderRadius: 7,
  height: 40,
  padding: 10,
};

export const input = {
  fontSize: 16,
};

export const inputLabel = {
  fontSize: 14,
  color: colorGuide.label.text,
};

export const checkBox = {
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colorGuide.input.text,
  },
  box: {
    marginRight: 8,
    marginVertical: 5,
  },
};

export const screenContainer = {
  backgroundColor: AppColors.white,
};

export const contentContainer = {
  ...screenContainer,
  paddingTop: 15,
  paddingHorizontal: 15,
};

export const iconTextButton = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: AppColors.darkGreen,
    fontSize: 16,
  },
  text: {
    color: AppColors.darkGreen,
  },
};