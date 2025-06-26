import DateTimePicker from "@react-native-community/datetimepicker";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Member = {
  id: string;
  name: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (request: any) => void;
  members: Member[];
};

const requestTypes = ["답장 요청", "자료 요청", "리뷰 요청", "기타 요청"];
const alertOptions = [
  { label: "알림 없음", value: "none" },
  { label: "한 번만 알림", value: "once" },
  { label: "답변 전까지 알림", value: "untilResponse" },
  { label: "마감 전까지 알림", value: "untilDeadline" },
];

export const RequestMessageModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  members,
}) => {
  const [type, setType] = useState(requestTypes[0]);
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [alertOption, setAlertOption] = useState(alertOptions[0].value);

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setDeadline(date.toISOString());
    }
  };

  const handleSubmit = () => {
    const request = {
      id: Date.now().toString(),
      type,
      content: message,
      deadline: deadline ? new Date(deadline) : null,
      targetUserIds: selectedMembers,
      alertOption,
      sentAt: new Date(),
      responses: [],
    };
    onSubmit(request);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setType(requestTypes[0]);
    setMessage("");
    setDeadline("");
    setSelectedMembers([]);
    setAlertOption(alertOptions[0].value);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}> 요청 메시지 생성</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ maxHeight: "80%" }}
            showsVerticalScrollIndicator={false}
          >
            {/* 요청 유형 */}
            <Text style={styles.label}>요청 유형</Text>
            <View style={styles.pickerRow}>
              {requestTypes.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.chip, type === t && styles.chipSelected]}
                  onPress={() => setType(t)}
                >
                  <Text
                    style={
                      type === t ? styles.chipTextSelected : styles.chipText
                    }
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 메시지 입력 */}
            <Text style={styles.label}>요청 메시지</Text>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="구체적인 요청 내용을 입력해주세요..."
              multiline
              numberOfLines={3}
              placeholderTextColor="#9CA3AF"
            />

            {/* 마감일 */}
            <Text style={styles.label}>마감일 (선택사항)</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.8}
            >
              <Text style={{ color: deadline ? "#1F2937" : "#9CA3AF" }}>
                {deadline
                  ? `${new Date(deadline).getFullYear()}.${(
                      new Date(deadline).getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}.${new Date(deadline)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`
                  : "날짜 선택"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={
                  deadline && !isNaN(new Date(deadline).getTime())
                    ? new Date(deadline)
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* 대상 멤버 */}
            <Text style={styles.label}>대상 멤버</Text>
            <View style={{ gap: 8 }}>
              {members.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.memberRow}
                  onPress={() => toggleMember(user.id)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedMembers.includes(user.id) &&
                        styles.checkboxChecked,
                    ]}
                  >
                    {selectedMembers.includes(user.id) && (
                      <View style={styles.checkboxDot} />
                    )}
                  </View>
                  <Text
                    style={{ fontSize: 14, color: "#374151", marginLeft: 8 }}
                  >
                    {user.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 알림 옵션 */}
            <Text style={styles.label}>알림 설정</Text>
            <View style={{ gap: 8 }}>
              {alertOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.radioRow}
                  onPress={() => setAlertOption(option.value)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.radio,
                      alertOption === option.value && styles.radioChecked,
                    ]}
                  >
                    {alertOption === option.value && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={{ marginLeft: 8 }}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* 버튼 영역 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!message.trim()}
              style={[styles.sendBtn, !message.trim() && { opacity: 0.5 }]}
            >
              <Text style={styles.sendBtnText}>요청 전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "92%",
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 6,
  },
  pickerRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    borderWidth: 0.6,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginRight: 2,
  },
  chipSelected: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  chipText: {
    color: "#374151",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FFF",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
    color: "#111827",
    minHeight: 48,
    marginBottom: 2,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#7C3AED",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7C3AED",
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radioChecked: {
    backgroundColor: "#7C3AED",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 6,
  },
  cancelBtnText: {
    color: "#7C3AED",
    fontWeight: "700",
    fontSize: 16,
  },
  sendBtn: {
    flex: 1,
    backgroundColor: "#7C3AED",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 6,
  },
  sendBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
