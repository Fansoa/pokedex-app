import { useThemeColor } from "@/hooks/useThemeColor";
import { useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Radio from "./Radio";

type Props = {
    value: "id" | "name",
    onChange: (v: Props['value']) => void
}

const options = [
    {label: "Number", value: "id"},
    {label: "Name", value: "name"}
] as const

const SortButton = ({value, onChange} : Props) => {
    const [position, setPosition] = useState<null | {
        top: number,
        right: number
    }>(null)
    const buttonRef = useRef<View>(null)
    const colors = useThemeColor();
    const [isModalVisible, setModalVisibility] = useState(false)

    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width

            })
            setModalVisibility(true)
        })
    }

    const onClose = () => {
        setModalVisibility(false)
    }
    
    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View ref={buttonRef} style={[styles.button, { backgroundColor: colors.grayWhite}]}>
                    <Image 
                        source={value === "id" ? require("@/assets/images/tag.png") : require("@/assets/images/text_format.png")}
                        style={{width: 16, height: 16}}
                    />
                </View>
            </Pressable>
            <Modal
                transparent
                visible={isModalVisible}
                onRequestClose={onClose}
            >
                <Pressable style={styles.backdrop} onPress={onClose}>
                    <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
                        <ThemedText style={styles.title} type="subtitle2">Sort By :</ThemedText>
                        <View style={[styles.card, {backgroundColor: colors.grayWhite}]}>
                            {options.map((o) => <View style={{gap: 8}} key={o.value}>
                                <Pressable onPress={() => onChange(o.value)} style={{gap: 8, flexDirection: 'row'}}>
                                    <Radio checked={o.value === value}/>
                                    <ThemedText color={"tint"} type="subtitle2">{o.label}</ThemedText>
                                </Pressable>
                            </View>)}
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    popup: {
        position: 'absolute',
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12
    },
    title: {
        paddingLeft: 20
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
        borderRadius: 12,
    }
})

export default SortButton;
