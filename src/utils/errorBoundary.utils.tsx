import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ErrorBoundary as ReactErrorBoundary} from 'react-error-boundary';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>Something went wrong:</Text>
    <Text>{error.message}</Text>
    <Button title="Try again" onPress={resetErrorBoundary} />
  </View>
);

const ErrorBoundary: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [key, setKey] = useState(0);

  const resetErrorBoundary = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={resetErrorBoundary}>
      {React.cloneElement(children as React.ReactElement, {key})}
    </ReactErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
});

export default ErrorBoundary;
