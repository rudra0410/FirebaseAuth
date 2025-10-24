/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type CalculatorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Calculator'
>;

const BUTTONS = [
  [
    { label: 'AC', type: 'action', color: 'green' },
    { label: '±', type: 'action', color: 'green' },
    { label: '%', type: 'action', color: 'green' },
    { label: '÷', type: 'operator', color: 'red' },
  ],
  [
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '×', type: 'operator', color: 'red' },
  ],
  [
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '−', type: 'operator', color: 'red' },
  ],
  [
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator', color: 'red' },
  ],
  [
    { label: '⟲', type: 'action', color: 'gray' },
    { label: '0', type: 'number' },
    { label: '.', type: 'number' },
    { label: '=', type: 'equal', color: 'red' },
  ],
];

const Calculator = () => {
  const navigation = useNavigation<CalculatorNavigationProp>();
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [lastPressed, setLastPressed] = useState<string>('');

  // Format result with thousands separator
  const formatResult = (val: string) => {
    if (val === 'Error') return val;
    const num = Number(val);
    if (isNaN(num)) return val;
    return num.toLocaleString();
  };

  // Expression for display (replace * / - with × ÷ −)
  const displayExpression = expression
    .replace(/\//g, '÷')
    .replace(/\*/g, '×')
    .replace(/-/g, '−');

  // Safe arithmetic expression evaluator
  const evaluateExpression = (expr: string): number => {
    // Replace unicode ops with JS ops
    expr = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    // Only allow numbers, operators, and decimal points
    if (!/^[\d+\-*/. %]+$/.test(expr)) throw new Error('Invalid characters');
    // Prevent consecutive operators (except minus for negative)
    if (/([+\-*/.])\1+/.test(expr)) throw new Error('Invalid expression');
    // Prevent leading operators except minus
    if (/^[+*/]/.test(expr)) throw new Error('Invalid expression');
    // Prevent trailing operators
    if (/[+\-*/.]$/.test(expr)) throw new Error('Invalid expression');
    // eslint-disable-next-line no-new-func
    return Function(`"use strict";return (${expr})`)();
  };

  const handleButtonPress = (btn: { label: string; type: string; color?: string }) => {
    setLastPressed(btn.label);
    if (btn.type === 'number') {
      if (btn.label === '.' && /[.]/.test(expression.split(/[^\d.]/).pop() || '')) return;
      setExpression(expression === '0' ? btn.label : expression + btn.label);
    } else if (btn.type === 'operator') {
      let op = btn.label;
      if (op === '÷') op = '/';
      if (op === '×') op = '*';
      if (op === '−') op = '-';
      if (expression === '' && op !== '-') return;
      if (/[+\-*/]$/.test(expression)) {
        setExpression(expression.slice(0, -1) + op);
      } else {
        setExpression(expression + op);
      }
    } else if (btn.label === 'AC') {
      setExpression('');
      setResult('0');
    } else if (btn.label === '±') {
      // Toggle sign of last number
      const match = expression.match(/(\d+\.?\d*)$/);
      if (match) {
        const num = match[1];
        if (num.startsWith('-')) {
          setExpression(expression.replace(/-?(\d+\.?\d*)$/, num.slice(1)));
        } else {
          setExpression(expression.replace(/(\d+\.?\d*)$/, '-' + num));
        }
      }
    } else if (btn.label === '%') {
      // Percentage of last number
      const match = expression.match(/(\d+\.?\d*)$/);
      if (match) {
        const num = parseFloat(match[1]);
        setExpression(expression.replace(/(\d+\.?\d*)$/, (num / 100).toString()));
      }
    } else if (btn.label === '⟲') {
      // Backspace
      setExpression(expression.slice(0, -1));
    } else if (btn.type === 'equal') {
      try {
        const res = evaluateExpression(expression);
        setResult(res.toString());
        setExpression('');
      } catch {
        setResult('Error');
        setExpression('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayExpression} numberOfLines={1} ellipsizeMode="head">{displayExpression}</Text>
        <Text style={styles.displayResult} numberOfLines={1} adjustsFontSizeToFit>{formatResult(result)}</Text>
      </View>
      <View style={styles.keypadContainer}>
        {BUTTONS.map((row, i) => (
          <View style={styles.keypadRow} key={i}>
            {row.map((btn, j) => (
              <TouchableOpacity
                key={btn.label}
                style={[styles.keypadButton,
                  btn.type === 'number' && styles.keypadButtonNumber,
                  btn.type === 'operator' && styles.keypadButtonOperator,
                  btn.type === 'equal' && styles.keypadButtonEqual,
                  btn.color === 'green' && styles.keypadButtonGreen,
                  btn.color === 'red' && styles.keypadButtonRed,
                  btn.color === 'gray' && styles.keypadButtonGray,
                ]}
                onPress={() => handleButtonPress(btn)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.keypadButtonText,
                    btn.color === 'green' && styles.keypadButtonTextGreen,
                    btn.color === 'red' && styles.keypadButtonTextRed,
                    btn.color === 'gray' && styles.keypadButtonTextGray,
                  ]}
                >
                  {btn.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingBottom: 24,
  },
  displayContainer: {
    width: '100%',
    minHeight: 160,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  displayExpression: {
    fontSize: 22,
    color: '#888',
    textAlign: 'right',
    marginBottom: 2,
    fontWeight: '400',
  },
  displayResult: {
    fontSize: 48,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  keypadContainer: {
    width: '96%',
    alignSelf: 'center',
    backgroundColor: '#fafbfc',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  keypadButton: {
    flex: 1,
    marginHorizontal: 6,
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  keypadButtonNumber: {
    backgroundColor: '#fff',
  },
  keypadButtonOperator: {
    backgroundColor: '#fff',
  },
  keypadButtonEqual: {
    backgroundColor: '#fff',
  },
  keypadButtonGreen: {
    backgroundColor: '#f3fcf7',
  },
  keypadButtonRed: {
    backgroundColor: '#fff5f5',
  },
  keypadButtonGray: {
    backgroundColor: '#f5f5f5',
  },
  keypadButtonText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#222',
  },
  keypadButtonTextGreen: {
    color: '#1ecb8d',
    fontWeight: '600',
  },
  keypadButtonTextRed: {
    color: '#e05a5a',
    fontWeight: '600',
  },
  keypadButtonTextGray: {
    color: '#aaa',
    fontWeight: '600',
  },
});

