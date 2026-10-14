import { View, type ViewProps } from 'react-native';

type SpacerProps = ViewProps & {
  height?: number;
};

export function Spacer({ height = 30, ...props }: SpacerProps) {
  return <View {...props} style={{ height }} />;
}
